import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it, beforeEach } from 'vitest';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('cria o app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('apresenta o titulo do workspace', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const texto = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(texto).toContain('Orbit Microfrontends');
    expect(texto).toContain('Monorepo com Module Federation');
  });

  it('lista os quatro projetos com estado explicito', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const itens = (fixture.nativeElement as HTMLElement).querySelectorAll('li[role="listitem"]');
    expect(itens.length).toBe(4);
  });

  it('avisa que os remotes ainda estao no roadmap', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const aviso = (fixture.nativeElement as HTMLElement).querySelector('[role="note"]');
    expect(aviso?.textContent).toContain('Escopo em aberto');
  });
});
