# 🌸 Clinica_Meraki - Landing Page

<img src="WEB/Imagens/home.png" alt="Home" width="880"/>

## • Projeto de Extensão 2025 ✨

---

## 📌 Descrição do Projeto

Desenvolvendo uma landing page para uma clínica de estética que até então não possuía presença online. O objetivo é criar uma plataforma funcional que ajude a promover a clínica, atrair clientes e melhorar a comunicação, oferecendo informações claras sobre serviços, contato e formas de agendamento.

---

## 🚀 Como executar o projeto na sua máquina

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Git**
- **Navegador (Chrome, Edge, Firefox…)**
- **VS Code ou outro editor**
- **(Opcional) Live Server do VS Code**

---

## 🔧 Instalação

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/Clinica_Meraki.git
```

### 2️⃣ Entre na pasta do projeto
```bash
cd Clinica_Meraki
```

### 3️⃣ Abra no VS Code
```bash
code .
```

### 4️⃣ Execute o projeto

✔ **Com Live Server:**  
- Clique com o botão direito no arquivo `index.html`  
- Selecione **"Open with Live Server"**

✔ **Sem Live Server:**  
- Abra o arquivo `index.html` clicando duas vezes

---

## ⚙️ Executando os testes

Este projeto não possui testes automatizados, mas você pode testar manualmente:

- Responsividade (celular, tablet, desktop)
- Navegação do menu  
- Funcionamento dos botões e links  
- Carregamento das imagens  
- Organização dos componentes  
- **Fluxo de Agendamento Online** (se implementado)

---

## 🔩 Análise de testes ponta a ponta (E2E)

Caso futuramente sejam implementados testes E2E, eles servirão para validar:

- Fluxo completo de navegação  
- Carregamento dos serviços  
- Funcionamento dos formulários  

*(Ainda não implementado)*

-- 
## 🤟 Acessibilidade

O projeto também considera boas práticas de acessibilidade, incluindo:

- **Suporte a LIBRAS**, utilizando ferramentas como **VLibras** para tradução em língua de sinais;
- **Contraste adequado** entre texto e fundo;
- **Navegação simples e intuitiva**, facilitando o uso para todos os públicos;
- **Textos alternativos** em todas as imagens (`alt="descrição"`), garantindo clareza para leitores de tela;

## 📦 Implantação — Firebase Hosting

A implantação do projeto é feita com **Firebase Hosting**, que permite hospedar sites estáticos de forma rápida e segura.

### 🔥 Como implantamos no Firebase

1. Instale o Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Faça login:
```bash
firebase login
```

3. Inicialize o projeto:
```bash
firebase init
```

4. Escolha **Hosting**  
5. Selecione ou crie um projeto Firebase  
6. Defina a pasta de publicação como:
```
dist
```
ou  
```
public
```

7. Realize o deploy:
```bash
firebase deploy
```

O Firebase gerará automaticamente um link público.

---

## 🛠️ Construído com

- **HTML5** – estrutura  
- **CSS3** – design e responsividade  
- **JavaScript** – interações  
- **JSON** – armazenamento simples  
- **Firebase** – banco de dados em nuvem  
- **VS Code** – editor  
- **Live Server** – testes locais  

---

## ✒️ Autores

- **Beatriz Modesto** – Desenvolvimento, Documentação e IHC  
- **Beatriz Lemos** – Desenvolvimento, Documentação e IHC  
- **Evelyn de Assunção Silva** – Desenvolvimento, Documentação e Banco de Dados  

---

Obrigada por visitar o projeto! 💗  
Sinta-se à vontade para contribuir ou deixar sugestões!
