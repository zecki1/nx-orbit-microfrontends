import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('página do workspace', () => {
  test('carrega com o título e a proposta do monorepo', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Orbit Microfrontends/);
    await expect(page.getByRole('heading', { level: 1, name: /Module Federation/i })).toBeVisible();
  });

  test('declara o escopo em aberto em vez de simular entrega', async ({ page }) => {
    await page.goto('/');

    const aviso = page.getByRole('note');
    await expect(aviso).toContainText(/Escopo em aberto/i);
  });

  test('lista os quatro projetos com estado explícito', async ({ page }) => {
    await page.goto('/');

    const cartoes = page.locator('li[role="listitem"]');
    await expect(cartoes).toHaveCount(4);

    for (const nome of ['shell', 'catalogo', 'biblioteca', 'configuracoes']) {
      await expect(cartoes.filter({ hasText: nome })).toHaveCount(1);
    }
  });

  test('lista os comandos do dia a dia', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('nx graph')).toBeVisible();
    await expect(page.getByText('nx affected -t build')).toBeVisible();
  });

  test('não tem scroll horizontal no celular', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});

test.describe('acessibilidade', () => {
  test('sem violações graves ou críticas', async ({ page }) => {
    await page.goto('/');

    const graves = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const problemas = graves.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );
    expect(problemas, JSON.stringify(problemas, null, 2)).toEqual([]);
  });
});
