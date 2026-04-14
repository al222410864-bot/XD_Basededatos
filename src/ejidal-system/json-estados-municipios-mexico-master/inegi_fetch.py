#!/usr/bin/env python3
"""
inegi_fetch.py - Descarga y convierte datos oficiales de INEGI a JSON

Fuente: Servicio Web del Catálogo Único de Claves Geoestadísticas
        https://www.inegi.org.mx/servicios/catalogounico.html
        https://gaia.inegi.org.mx/wscatgeo/v2/

No requiere token ni registro.

Uso:
  python inegi_fetch.py --download              Descarga datos crudos de la API de INEGI
  python inegi_fetch.py --convert               Convierte inegi_raw.json a los JSONs del proyecto
  python inegi_fetch.py --download --convert    Hace ambos pasos seguidos
  python inegi_fetch.py --convert --input otro.json   Usa un archivo raw distinto
"""

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE_URL = "https://gaia.inegi.org.mx/wscatgeo/v2"
DEFAULT_RAW_FILE = "inegi_raw.json"


def fetch_json(url: str) -> dict:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "inegi-fetch/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"\nError HTTP {e.code} al consultar: {url}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"\nError de red: {e.reason}", file=sys.stderr)
        sys.exit(1)


def download(output_file: str) -> None:
    print("Consultando estados desde la API de INEGI...")
    states_data = fetch_json(f"{BASE_URL}/mgee/")
    states = states_data.get("datos", [])

    if not states:
        print("Error: la API no devolvió estados.", file=sys.stderr)
        sys.exit(1)

    print(f"  {len(states)} estados encontrados.\n")

    raw = {"estados": states, "municipios": {}}

    for i, state in enumerate(states, 1):
        cve_ent = state["cve_ent"]
        nombre = state["nomgeo"]
        print(f"  [{i:02d}/{len(states)}] {nombre}...", end=" ", flush=True)

        mun_data = fetch_json(f"{BASE_URL}/mgem/{cve_ent}")
        municipios = mun_data.get("datos", [])
        raw["municipios"][cve_ent] = municipios
        print(f"{len(municipios)} municipios")

        # Pequeña pausa para no saturar la API
        if i < len(states):
            time.sleep(0.25)

    out = Path(output_file)
    out.write_text(json.dumps(raw, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nDatos crudos guardados en: {out}")


def convert(input_file: str) -> None:
    src = Path(input_file)
    if not src.exists():
        print(f"Error: no se encontró '{input_file}'. Ejecuta primero --download.", file=sys.stderr)
        sys.exit(1)

    raw = json.loads(src.read_text(encoding="utf-8"))
    states = raw.get("estados", [])
    municipios_raw = raw.get("municipios", {})

    if not states:
        print("Error: el archivo raw no contiene datos de estados.", file=sys.stderr)
        sys.exit(1)

    # --- estados-municipios.json ---
    # Formato: { "NombreEstado": ["Municipio1", "Municipio2", ...], ... }
    estados_municipios = {}
    for state in states:
        cve_ent = state["cve_ent"]
        nombre_estado = state["nomgeo"]
        municipios = municipios_raw.get(cve_ent, [])
        nombres = sorted(m["nomgeo"] for m in municipios)
        estados_municipios[nombre_estado] = nombres

    out_em = Path("estados-municipios.json")
    out_em.write_text(json.dumps(estados_municipios, ensure_ascii=False, indent=4), encoding="utf-8")
    print(f"Generado: {out_em}  ({len(estados_municipios)} estados)")

    # --- estados.json ---
    # Formato: [{ "cve_ent": "01", "clave": "Ags.", "nombre": "AGUASCALIENTES" }, ...]
    estados = [
        {
            "cve_ent": s["cve_ent"],
            "clave": s["nom_abrev"],
            "nombre": s["nomgeo"].upper(),
        }
        for s in states
    ]

    out_e = Path("estados.json")
    out_e.write_text(json.dumps(estados, ensure_ascii=False, indent=4), encoding="utf-8")
    print(f"Generado: {out_e}  ({len(estados)} estados)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Descarga y convierte el catálogo de estados/municipios de INEGI a JSON.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "--download",
        action="store_true",
        help="Descarga datos crudos desde la API oficial de INEGI.",
    )
    parser.add_argument(
        "--convert",
        action="store_true",
        help="Convierte el archivo raw a estados-municipios.json y estados.json.",
    )
    parser.add_argument(
        "--input",
        metavar="ARCHIVO",
        default=DEFAULT_RAW_FILE,
        help=f"Archivo raw de entrada para --convert (default: {DEFAULT_RAW_FILE}).",
    )
    parser.add_argument(
        "--output",
        metavar="ARCHIVO",
        default=DEFAULT_RAW_FILE,
        help=f"Archivo raw de salida para --download (default: {DEFAULT_RAW_FILE}).",
    )

    args = parser.parse_args()

    if not args.download and not args.convert:
        parser.print_help()
        sys.exit(0)

    if args.download:
        download(args.output)

    if args.convert:
        # Si se hizo download en la misma ejecución y no se especificó --input,
        # usar el mismo archivo que se guardó en --output.
        input_file = args.input if args.input != DEFAULT_RAW_FILE else args.output
        convert(input_file)


if __name__ == "__main__":
    main()
