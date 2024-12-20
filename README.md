# Desenvolvimento de Cliente WEB - Criptografia e Segurança
Protótipo de front-end para disciplina Desenvolvimento de Cliente WEB

## Colaboradores

<!-- readme: collaborators -start -->
<table>
	<tbody>
		<tr>
            <td align="center">
                <a href="https://github.com/gilmar-sales">
                    <img src="https://avatars.githubusercontent.com/u/7975964?v=4" width="100;" alt="gilmar-sales"/>
                    <br />
                    <sub><b>Gilmar Sales</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://github.com/carlosjnr27">
                    <img src="https://avatars.githubusercontent.com/u/75266260?v=4" width="100;" alt="carlosjnr27"/>
                    <br />
                    <sub><b>Carlos Rodrigues da Silva Junior</b></sub>
                </a>
            </td>
		</tr>
	<tbody>
</table>
<!-- readme: collaborators -end -->

# Proposta

Apresentar uma simulação das principais vulnerabilidades de aplicativos WEB.

O  trabalho [(PDF) Desenvolvimento Seguro de Sistemas Web: Uma Revisão Sistemática (researchgate.net)](https://www.researchgate.net/publication/357436534_Desenvolvimento_Seguro_de_Sistemas_Web_Uma_Revisao_Sistematica) analisou 278 artigos e chegou a conclusão de que as principais vulnerabilidades são:

## Cross-Site Request Forgery - CSRF
Ocorre quando sites de terceiros conseguem interceptar as credenciais dos usuários de um aplicativo.
## Cross Site Scripting - XSS
Normalmente ocorre quando se utiliza conteúdos de terceiros (CDNs, Propagandas, etc...) em uma aplicação, esses conteúdos podem conseguir injetar algum script malicioso.
## Denial of Service - DoS
Ataques de negação de serviço podem acontecer pela força bruta, que podem ser barrados com uma simples limitação de requisições por usuário, porém, caso um usuário encontre um endpoint que possui um algoritmo muito complexo assintoticamente, este endpoint poderá ser explorado para negar o serviço sem passar do limite de requisições. 
