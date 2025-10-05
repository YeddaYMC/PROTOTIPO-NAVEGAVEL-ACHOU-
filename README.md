ACHOU! — Protótipo Navegável

Como usar

1. Abra o arquivo `index.html` no navegador (duplo clique ou arraste para o navegador).
2. Tela inicial (1): clique em "Criar Minha Conta" ou "Já Tenho Conta (Login)".
3. Ao criar conta: escolha o papel (Consumidor/Empreendedor), preencha o formulário. O protótipo salva dados no LocalStorage.
4. Fluxo RBAC: após login/criação a aplicação redireciona para as telas do tipo de perfil (Consumidor -> Tela 5, Empreendedor -> Tela 8).

Observações

- Este é um protótipo estático para demonstração de fluxo. Integrações (Google Login, WhatsApp, Google Maps) são simuladas.
- Dados persistem no navegador via LocalStorage. Para reiniciar, limpe o LocalStorage do domínio ou use o console do navegador.

Próximos passos sugeridos

- Adicionar animações de transição entre telas.
- Integrar mapas reais e link para o WhatsApp/rotas.
- Melhorar validações de formulário e mensagens de erro.

---

Design-to-Code na Construção do Protótipo

Neste trabalho, a escolha de ferramentas foi feita para garantir precisão e acessibilidade do protótipo navegável:

| Item | Ferramenta Escolhida | Justificativa Estratégica |
|---|---|---|
| Ambiente de Código | VS Code (via Codespaces) | Permite codificar em um ambiente de desenvolvimento completo e online, sem a necessidade de instalações locais. |
| Tecnologia de Prototipagem | React para Web | É a tecnologia que gera o código HTML/CSS/JS necessário para ser exibido no navegador e aceito pelo GitHub Pages. |
| Hospedagem | GitHub Pages | Oferece uma URL pública e gratuita para que a orientadora possa testar o protótipo navegável em qualquer dispositivo. |


PAP Resumido: Fluxo de Trabalho Design-to-Code

O fluxo de trabalho para colocar o protótipo navegável em produção, baseado em código, segue estas fases essenciais:

| Fase | Ação Principal | Comando Chave (Terminal) |
|---|---|---|
| 1. Configuração | Criar o ambiente de desenvolvimento (Codespaces) e o projeto React para Web. | git clone [url_do_template] |
| 2. Codificação | Codificar todos os Componentes (Button, Header) e implementar o Sistema de Navegação (React Router). | N/A (Codificação no editor) |
| 3. Construção (Build) | Converter o código React em arquivos estáticos (HTML/CSS/JS) para o navegador. | npm run build |
| 4. Implantação (Deploy) | Publicar o conteúdo da pasta de build no serviço de hospedagem. | Configurar o GitHub Pages para ler a pasta de build. |


O resultado é um protótipo navegável de alta fidelidade, baseado em código, acessível através de um link público.
