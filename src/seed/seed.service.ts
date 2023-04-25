import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from '../common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private pokemonService: PokemonService,
    private axiosAdapter: AxiosAdapter,
  ) {}

  async executeSeed() {
    const data = await this.axiosAdapter.get<any>(
      'https://pokeapi.co/api/v2/pokemon?limit=200',
    );
    const ListPromise = [];
    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const nroPokemon: number = +segments[segments.length - 2];
      ListPromise.push(
        this.pokemonService.create({ name: name, nro: nroPokemon }),
      );
      // await this.pokemonService.create({ name: name, nro: nroPokemon });
    });
    await Promise.all(ListPromise);
    return 'Seed executed successfully';
  }
}
