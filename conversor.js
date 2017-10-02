// Biblioteca para converter um número em formato textual

let texto = [];

// Array de números por extenso para uso na função
texto[0] = '';
texto[1] = 'um';
texto[2] = 'dois';
texto[3] = 'três';
texto[4] = 'quatro';
texto[5] = 'cinco';
texto[6] = 'seis';
texto[7] = 'sete';
texto[8] = 'oito';
texto[9] = 'nove';
texto[10] = 'dez';
texto[11] = 'onze';
texto[12] = 'doze';
texto[13] = 'treze';
texto[14] = 'quatorze';
texto[15] = 'quinze';
texto[16] = 'dezesseis';
texto[17] = 'dezessete';
texto[18] = 'dezoito';
texto[19] = 'dezenove';
texto[20] = 'vinte';
texto[30] = 'trinta';
texto[40] = 'quarenta';
texto[50] = 'cinquenta';
texto[60] = 'sessenta';
texto[70] = 'setenta';
texto[80] = 'oitenta';
texto[90] = 'noventa';
texto[100] = 'cem';
texto[200] = 'duzentos';
texto[300] = 'trezentos';
texto[400] = 'quatrocentos';
texto[500] = 'quinhentos';
texto[600] = 'seiscentos';
texto[700] = 'setecentos';
texto[800] = 'oitocentos';
texto[900] = 'novecentos';

// Converte centena de milhão
function calculaCentenaMilhao(valor){
	let msg = '', de = '';

	if(valor >= 100000000)
		// Verifica valor exato na casa das centenas de milhões
		if(valor % 100000000 == 0)
			msg = texto[parseInt(valor / 1000000)] + ' milhões de ';
		else{
			// Verifica se é somente milhões, pois no caso de somente milhões deve-se acrescentar 'de' antes dos 'reais'
			if(valor % 1000000 == 0)
				de = 'de ';

			// Verifica se é menor que 200 para validar o caso do 'cento'
			if(parseInt(valor / 1000000) >= 200)
				msg = texto[parseInt(valor / 100000000) * 100] + ' ';
			else
				// Tratamento par ao caso do 'cento'
				if(valor % 100000000 >= 1000000)
					msg = 'cento ';
				else
					msg = 'cem ';
			// Verifica se o resto ainda é na casa dos milhões, caso contrário acrescenta a palavra 'milhões e'
			if(valor % 100000000 >= 1000000)
				msg += 'e ' + calculaDezenaMilhao(valor % 100000000);
			else
				msg += 'milhões e' + calculaCentenaMilhar(valor % 100000000);
		}
	else
		if(valor > 0)
			msg = calculaDezenaMilhao(valor);

	return msg;
}

// Converte dezena de milhão
function calculaDezenaMilhao(valor){
	let msg = '', de = '';

	if(valor >= 10000000)
		// Verifica valor exato na casa das dezenas de milhões
		if(valor % 10000000 == 0)
			msg = texto[parseInt(valor / 1000000)] + ' milhões de ';
		else{
			// Verifica se é somente milhões, pois no caso de somente milhões deve-se acrescentar 'de' antes dos 'reais'			
			if(valor % 1000000 == 0)
				de = 'de ';
			// Tratamento do caso até a dezena 20			
			if(parseInt(valor / 1000000) < 20){
				msg = texto[parseInt(valor/ 1000000)] + ' milhões ' + de;
				// Valida se o resto não for 0, continunando a conversão
				if(valor % 1000000 != 0)
					msg += 'e ' + calculaMilhao(valor % 1000000);
			}
			else{
				msg = texto[parseInt(valor / 10000000) * 10] + ' ';
				// Valida se o resto for maior ou igual a um milhão, se sim acrescenta um 'e ', caso contrário finaliza com 'milhões ' a casa
				if(valor % 10000000 >= 1000000)
					msg += 'e ' + calculaMilhao(valor % 10000000);
				else
					msg += de + 'milhões e ' + calculaMilhao(valor % 10000000);
			}
		}
	else
		if(valor >= 0)
			msg = calculaMilhao(valor);

	return msg;
}

// Converte milhão
function calculaMilhao(valor){
	let msg = '';

	if(valor >= 1000000)
		// Verifica valor exato na casa de unidades de milhões
		if(valor % 1000000 == 0)
			msg = texto[parseInt(valor / 1000000)] + ' milhões de ';
		else{			
			msg = texto[parseInt(valor / 1000000)] + ' milhões e ';						
			msg += calculaCentenaMilhar(valor % 1000000);
		}
	else
		if(valor > 0)
			msg = calculaCentenaMilhar(valor);

	return msg;
}

// Converte centena de milhar
function calculaCentenaMilhar(valor){
	let msg = '';

	if(valor >= 100000)
		// Verifica valor exato na casa das centenas de milhares
		if(valor % 100000 == 0)
			msg = texto[parseInt(valor / 1000)] + ' mil ';
		else{			
			if(parseInt(valor / 1000) >= 200)
				msg = texto[parseInt(valor / 100000)*100] + ' ';
			else
				// Tratamento par ao caso do 'cento'
				if(valor % 100000 >= 1000)
					msg = 'cento ';
				else
					msg = 'cem ';
			// Verifica se existe resto maior que 1000 para o acréscimo do 'e' antes da palavra 'mil'
			if(valor % 100000 >= 1000)
				// Valida o caso do 'um' ao invés de apenas retornar 'mil'
				if(valor % 100000 == 1000)
					msg += 'e um ' + calculaMilhar(valor % 100000);
				else
					msg += 'e ' + calculaDezenaMilhar(valor % 100000);
			else
				msg += 'mil e ' + calculaMilhar(valor % 100000);
		}
	else
		if(valor > 0)
			msg = calculaDezenaMilhar(valor);

	return msg;
}

// Converte dezena de milhar
function calculaDezenaMilhar(valor){
	let msg = '', temp;

	if(valor >= 10000)
		// Verifica valor exato na casa das dezenas de milhares
		if(valor % 10000 == 0)
			msg = texto[parseInt(valor / 1000)] + ' mil ';
		else{
			// Tratamento do caso até a dezena 20
			if(parseInt(valor / 1000) < 20){
				msg = texto[parseInt(valor / 1000)] + ' mil ';	
				// Se houver resto continuará efetuando a conversão
				if(valor % 1000 != 0)
				  msg += 'e ' + calculaMilhar(valor % 1000);
			}
			else{
				msg = texto[parseInt(valor / 10000) * 10] + ' ';		
				// Valida caso exista resto maior que mil		
				if(valor % 10000 >= 1000)					
					// Se o valor for exatamente mil trata desta maneira, caso contrário continua a conversão
					if(valor % 10000 == 1000)
						msg += 'e um mil ';
					else
						msg +=  'e ' + calculaMilhar(valor % 10000);
				else
					msg += 'mil e ' + calculaMilhar(valor % 1000);
			}
		}
	else
		if(valor > 0)
			msg = calculaMilhar(valor);

	return msg;
}

// Converte milhar
function calculaMilhar(valor){
	let msg = '';

	if(valor >= 1000){
		// Verifica valor exato na casa das unidades de milhares
		if(valor % 1000 == 0){
			// Trata o caso da unidade 'um mil' transformando em 'mil'
			if(valor != 1000)
				msg = texto[parseInt(valor / 1000)] + ' mil ';
			else
				msg = 'mil ';
		}
		else {			
			msg = texto[parseInt(valor / 1000)] + ' mil ';
			// Se existir resto da divisão continua convertendo o restante do valor
			if(valor % 1000 != 0)
				msg += 'e '+ calculaCentena(valor % 1000);
		}
	}
	else
		if(valor > 0)
			msg = calculaCentena(valor);
	return msg;
}

// Converte centena
function calculaCentena(valor){
	let msg = '';

	// Verifica se o valor é aceitável
	if(valor >= 100){
		// Verifica valor exato na casa das centenas
		if(valor % 100 == 0){
			msg = texto[valor] + ' ';
		}
		else{
			// Tratamento par ao caso do 'cento'
			if(valor >= 200)
				msg = texto[parseInt(valor / 100) * 100];
			else
				msg = 'cento';
			msg += ' e ' + calculaDezena(valor % 100);
		}
	}
	else
		// Valida se o valor ainda tem dezena sem calcular
		if(valor > 0)
			msg = calculaDezena(valor);

	return msg;
}

// Converte dezena e unidades
function calculaDezena(valor){
	let msg = '';

	// Valida valores maiores que 20, pois será necessário usar o resto da divisão inteira por 10 do valor para calcular as unidades
	if(valor > 20) {
		msg = texto[parseInt(valor / 10) * 10] + ' ';
		if(valor % 10 != 0)
			msg += 'e ' + texto[valor % 10] + ' ';
	}		
	else
		msg = texto[valor] + ' ';

	return msg;
}

// Função que identifica o número de dígitos para chamar a respectiva função de conversão
function converteEmTexto(valor){
	let extenso = '';

	if(valor >= 100000000) // 9 casas
		extenso = calculaCentenaMilhao(valor);
	else
		if(valor >= 10000000){ // 8 casas
			extenso = calculaDezenaMilhao(valor);
		}
		else
			if(valor >= 1000000){ // 7 casas
				extenso = calculaMilhao(valor);
				// Caso o valor seja uniário, deve-se trocar o plural pelo singular
				if(extenso.startsWith('um'))
					extenso = extenso.replace('milhões', 'milhão');
			}
			else
				if(valor >= 100000) // 6 casas
					extenso = calculaCentenaMilhar(valor);
				else
					if(valor >= 10000) // 5 casas
						extenso = calculaDezenaMilhar(valor);
					else
						if(valor >= 1000){ // 4 casas							
							extenso = calculaMilhar(valor);
							// caso comece com 'um mil' deve-se trocar por 'mil'
							if(extenso.startsWith('um mil'))
								extenso = extenso.replace('um mil', 'mil');
						}
						else
							if(valor >= 100){ // 3 casas
								extenso = calculaCentena(valor);
							}
							else // 2 casas ou 1 casa
								extenso = calculaDezena(valor);

	return extenso;
}

let Converter = (numero) => {
	// Captura os tamanhos da parte inteira e da parte decimal se houver
	let partes = numero.toString().split(',');
	let inteiro, decimal;
	let mensagem = '';
	// Converte a vírgula em ponto e converte o tipo literal em numérico
	numero = Number(numero.replace(/,/g, '.'));

	// Verifica se é um tipo numérico
	if(typeof numero == 'number' && partes.length > 1)
		// Não aceita números negativos
		if(numero >= 0) {
			let real = numero;
			// captura a parte iteira do número
			numero = parseInt(numero);
			// captura a parte decimal do número
			real = parseFloat((real-numero)).toFixed(2);

			// Verifica se a parte inteira do número tem até 9 dígitos e se a parte decimal possui as duas casas decimais
			if(partes[1].length == 2 && partes[0].length <= 9) {
				// Pega os dados dos valores convertidos em texto
				inteiro = converteEmTexto(numero).trim();
				decimal = converteEmTexto(parseInt(real*100)).trim();

				// Verifica o plural, singular e 0 e retorna a mensagem pronta				
				if(inteiro == '')
					if(decimal == '')
						mensagem = '0,00 reais'
					else
						if(decimal != 'um')
							mensagem = decimal + ' centavos';
						else
							mensagem = decimal + ' centavo';
				else
					if(inteiro != 'um')	{
						mensagem = inteiro + ' reais';
						if(decimal != '')
							if(decimal != 'um')
								mensagem += ' e ' + decimal + ' centavos';
							else
								mensagem += ' e ' + decimal + ' centavo';
					}
					else{
						mensagem = inteiro + ' real';
						if(decimal != '')
							if(decimal != 'um')
								mensagem += ' e ' + decimal + ' centavos';
							else
								mensagem += ' e ' + decimal + ' centavo';
					}

				console.log(mensagem);
			}
			else
				console.log('Número fora do padrão');
		}
		else
			console.log('Número não pode ser menor que 0,00');
	else
		console.log('O valor fornecido deve ser numérico ');

};

module.exports = {Converter};