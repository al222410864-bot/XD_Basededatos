import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../../entities/usuarios/usuarios.entity';
import { CreateUsuarioInput } from '../../dtos/usuarios/create-usuario.input';
import { UpdateUsuarioInput } from '../../dtos/usuarios/update-usuario.input'; // ✨ IMPORTANTE
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private repository: Repository<Usuario>,
  ) {}

  // ==========================================
  // 🔒 1. MÉTODOS DE AUTENTICACIÓN Y REGISTRO
  // ==========================================

  async create(data: CreateUsuarioInput): Promise<Usuario> {
    const existe = await this.findOneByNombre(data.nombre_usuario);
    if (existe) {
      throw new ConflictException('El nombre de usuario ya está en uso.');
    }

    const salt = await bcrypt.genSalt(10);
    data.contrasena = await bcrypt.hash(data.contrasena, salt);

    const nuevoUsuario = this.repository.create(data);
    return await this.repository.save(nuevoUsuario);
  }

  async findOneByNombre(nombre_usuario: string): Promise<Usuario | null> {
    return await this.repository.findOne({
      where: { nombre_usuario }
    });
  }

  // ==========================================
  // 🛠️ 2. MÉTODOS CRUD BÁSICOS (Los que faltaban)
  // ==========================================

  async findAll(): Promise<Usuario[]> {
    return await this.repository.find();
  }

  async findOne(id_usuario: number): Promise<Usuario> {
    const usuario = await this.repository.findOneBy({ id_usuario });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  async update(id_usuario: number, data: UpdateUsuarioInput): Promise<Usuario> {
    data.id_usuario = id_usuario;
    
    // 🛡️ Extra de seguridad: Si intentan actualizar la contraseña, la volvemos a encriptar
    if (data.contrasena) {
      const salt = await bcrypt.genSalt(10);
      data.contrasena = await bcrypt.hash(data.contrasena, salt);
    }

    const register = await this.repository.preload(data);
    if (!register) {
      throw new NotFoundException(`Usuario con id: ${id_usuario} no encontrado`);
    }
    return await this.repository.save(register);
  }

  async remove(id_usuario: number): Promise<boolean> {
    const result = await this.repository.delete({ id_usuario });
    return result.affected ? result.affected > 0 : false;
  }
}