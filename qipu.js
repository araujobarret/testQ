// Script de um controlador para converter um número por extenso e consultar dados sobre aeródromos

const _ = require('lodash');
const yargs = require('yargs');

const conversor = require('./conversor');
const aerodromo = require('./aerodromo');

// Define os argumentos a serem lidos
let numero = {
	describe: 'Número a ser convertido em texto por extenso',
	demand: true
};

let icao = {
	describe: 'Código ICAO do aeródromo',
	demand: true,
	alias: 'icao'
};

// Define o comando fornecendo ajuda para o usuário
const argv = yargs
	.command('converte_numero', 'Converte um número em texto corrido', {numero})
	.command('consulta_aerodromo', 'Retorna informações sobre o aeródromo', {icao})
	.help()
	.argv;

// captura os dados enviados como argumentos da execução
let cmd = argv._[0];

// Identifica o comando 
if(cmd == 'converte_numero'){
	conversor.Converter(argv.numero.toString());
}
else
	if(cmd == 'consulta_aerodromo'){
		aerodromo.ConsultarAerodromo(argv.icao.toString().toUpperCase());
	}
	else
		console.log('Comando não reconhecido');
