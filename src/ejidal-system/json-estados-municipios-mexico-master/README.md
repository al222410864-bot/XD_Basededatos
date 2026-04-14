# json-estados-municipios-mexico

`estados-municipios.json` está basado directamente en la data proporcionada por INEGI,
sólo que INEGI lo da en .CSV, .DBF, entre otros formatos, es por eso que lo pasé a JSON.

`estados.json` es un array con data de los estados, pero sin municipios.

---

## Generar los JSONs tú mismo (siempre con la última data de INEGI)

INEGI cuenta con un servicio web oficial que regresa datos en JSON sin necesidad de token ni registro:
**https://gaia.inegi.org.mx/wscatgeo/v2/**

El script `inegi_fetch.py` incluido en este repo lo consume para que puedas generar los JSONs
actualizados en cualquier momento, sin depender de que yo los refresque manualmente.

### Requisitos

- Python 3 (sin dependencias externas)

### Uso

```bash
# 1. Descarga los datos crudos desde la API de INEGI
python inegi_fetch.py --download

# 2. Convierte el archivo descargado a los JSONs del proyecto
python inegi_fetch.py --convert

# O los dos pasos de una sola vez
python inegi_fetch.py --download --convert
```

Esto genera/sobreescribe `estados-municipios.json` y `estados.json` con la información
más reciente del Catálogo Único de Claves de Áreas Geoestadísticas (AGEEML) de INEGI.
