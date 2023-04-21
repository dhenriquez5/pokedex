import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {
  /**
   *
   */
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const newPokemon = await this.pokemonModel.create(createPokemonDto);
      return newPokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(termino: string) {
    let pokemon: Pokemon;
    if (!isNaN(+termino)) {
      pokemon = await this.pokemonModel.findOne({ nro: termino });
      if (pokemon) {
        return pokemon;
      }
    }

    if (isValidObjectId(termino)) {
      pokemon = await this.pokemonModel.findById(termino);
      if (pokemon) {
        return pokemon;
      }
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: termino.toLowerCase(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(`Pokemon with this term doesn't exist`);
    console.log(pokemon);
    return pokemon;
  }

  async update(termino: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(termino);
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }
    try {
      await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });
    } catch (error) {
      this.handleExceptions(error);
    }

    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const resp = await this.pokemonModel.findByIdAndDelete(id);
    if (!resp)
      throw new BadRequestException(`pokemon with id ${id} doesn't exist`);
  }

  private handleExceptions(error: any) {
    console.log(error);
    if (error.code === 11000)
      throw new BadRequestException('Pokemon exists in db');

    throw new InternalServerErrorException(
      'Error interno consultar registro de logs',
    );
  }
}
