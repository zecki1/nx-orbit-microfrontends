import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly titulo = signal('Orbit Microfrontends');
  protected readonly remotos = signal<readonly Remoto[]>(REMOTOS);
  protected readonly comandos = signal<readonly Comando[]>(COMANDOS);
}

interface Remoto {
  readonly nome: string;
  readonly papel: string;
  readonly rota: string;
  readonly estado: 'planejado' | 'em construcao';
}

interface Comando {
  readonly comando: string;
  readonly efeito: string;
}

const REMOTOS: readonly Remoto[] = [
  {
    nome: 'shell',
    papel: 'Host de Module Federation: router, layout e design system compartilhado',
    rota: '/',
    estado: 'em construcao',
  },
  {
    nome: 'catalogo',
    papel: 'Listagem e detalhe de jogos consumindo a API compartilhada',
    rota: '/catalogo',
    estado: 'planejado',
  },
  {
    nome: 'biblioteca',
    papel: 'Favoritos persistidos via Supabase com RLS por usuário',
    rota: '/biblioteca',
    estado: 'planejado',
  },
  {
    nome: 'configuracoes',
    papel: 'Preferências de locale, tema e acessibilidade',
    rota: '/configuracoes',
    estado: 'planejado',
  },
];

const COMANDOS: readonly Comando[] = [
  { comando: 'nx serve shell', efeito: 'sobe o host em :4200' },
  { comando: 'nx serve catalogo', efeito: 'sobe o remoto com hot reload próprio' },
  { comando: 'nx graph', efeito: 'mostra o grafo de dependências do monorepo' },
  { comando: 'nx affected -t build', efeito: 'rebuild só o que o PR tocou' },
  { comando: 'nx run-many -t build', efeito: 'build de todos os projetos' },
];
