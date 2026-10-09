# TechFlow

Dashboard desenvolvido para o Checkpoint 5 de FrontEnd Design.

## Integrantes

- Bruno Minitti — RM: 571981
- Lucas Rodrigues — RM: 569742
- Nicolas Gomes de Almeida — RM: 573079

## Tecnologias

- HTML
- Tailwind CSS
- CSS
- JavaScript
- Vite

## Recursos implementados

- Dashboard responsivo com Navbar e Sidebar.
- Informações do usuário e dropdown.
- Pesquisa de projetos pelo texto dos cards.
- Quatro cards de indicadores.
- Seis cards de projetos em Grid com tamanhos diferentes.
- Cadastro de novos projetos com validação visual.
- Atualização do total de projetos ativos após o cadastro.
- Pesquisa com mensagem quando não há resultados.
- Menu mobile com fechamento ao selecionar uma seção, clicar fora ou pressionar Esc.
- Temas Light, Dark e System.
- Preferência de tema salva no localStorage.
- Estados de interação e transições.

## Como executar

1. Abra a pasta do projeto no VS Code.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm run dev`.
4. Abra o endereço mostrado no terminal.

Para gerar a versão de produção, execute `npm run build`.

## Observações

A página começa com seis projetos de exemplo.

Os novos projetos são adicionados à lista e podem ser pesquisados.
O indicador de projetos ativos é atualizado após cada cadastro.
Os demais indicadores mantêm os dados de exemplo.

Os projetos cadastrados permanecem somente enquanto a página estiver aberta.
Ao atualizar, a página volta aos dados iniciais. Não há banco de dados.

A preferência de tema é salva no localStorage.

## GitHub

https://github.com/br330a/CP5-FRONT

## Dificuldades encontradas

O JavaScript ainda é um desafio grande para manipular e entender as funcionalidades.
A parte do modo de cor padrão do site é levemente complicada devido a mudança em várias áreas do site.