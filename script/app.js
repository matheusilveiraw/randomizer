//DIA 18/06 - Inicio do projeto, foi feito a página index completa. Navbar e rodapé serão reutilizadas nas outas páginas
//Comecei o app, o botão criar campo agora cria (dinamicamente) inputs para inserção dos nomes do alunos e cria botões para que o usuario possa deleta-los.
//Criei o espaço para algumas wh questions mas provavelmente haverão mudanças em relação à estas
//Dia 21/06 - Terminei de por todos os seletores e o próximo passo é fazer o botão salvar salvar todos os nomes, wh words e auxiliares. 
//Dia 22/06 - A função salvar está pronta, precisando ser preparada apenas exeções no momento. 
//Alguns ajustes em termos de responsividade 
//Lógica do sorteio de alunos feita (apenas a parte do sorteio dos indices)
//23/06 - Sorteio dos aluno finalizados, assim como das WH words e dos auxiliares. Próximo passo é mostrar o resultado para o usuario.  
//24/06 - O programa agora imprime os resultados na área de resultado. 
// Tratamento de erros feitos. 
//25/06 - O programa guarda sorteios no web storage e os exibe na página últimos sorteios 
//28/06 - Comecei a desenvolver a função deletar, que deleta um campo de formulario. 
//29/06 - Função deletar concluida. Comecei e terminei a função deletarBD, que elimina um sorteio do bd do projeto. 

//mudar a brand da página conforme o tamanho
function mudaBrand() { 
    let brand = document.getElementById('brand')

    let width = window.screen.availWidth
    if(width >= 352) { 
        brand.innerHTML = 'Student Randomizer'
 
    } else { 
        brand.innerHTML = '<ion-icon name="book-outline" size="large">'
    }

    /*
    *   REUTILIZAR ESSA FUNÇÃO PARA MUDAR OUTRO ÍCONES (SALVAR E CRIAR CAMPO)
    *
    */

    let btnCriarCampo = document.getElementById('criarCampoAluno')
    let btnSortear = document.getElementById('sortear')

    if(width >= 300) { 
        btnCriarCampo.innerHTML = 'Criar campo'
        btnSortear.innerHTML = 'Sortear'
    } else { 
        btnCriarCampo.innerHTML = '<ion-icon name="add-circle-outline" size="large"></ion-icon>'

        btnSortear.innerHTML = '<ion-icon name="dice-outline" size="large"></ion-icon>'

    }


}


var deleteId = 1 

//criar um campo para inserir um novo nome
function criarCampo() { 
    //console.log('criou campo')
    
    let divAlunoFormBtn = document.createElement('div') //cria div
    divAlunoFormBtn.className = "input-group mt-2 div-campo-btn"
    let formAluno = document.createElement('input') //cria o input
    formAluno.className = "form-control form-aluno-entrada"
    formAluno.placeholder = "Nome do aluno"

    divAlunoFormBtn.appendChild(formAluno) //associa o form à div 

    let btnRemAluno = document.createElement('button')
    btnRemAluno.innerHTML = 'X'
    btnRemAluno.style.height = 38
    btnRemAluno.className = "btn btn-danger btn-delete"
    btnRemAluno.setAttribute('onclick', 'deletar(this)')
    


    //console.log(document.getElementsByClassName('div-campo-btn'))

    divAlunoFormBtn.appendChild(btnRemAluno) //associa o btn à div 
    //divAlunoFormBtn.onclick = deletarDivFormBtn()
    
    alunos.appendChild(divAlunoFormBtn)//associa a div dentro da div alunos, onde estão os campos
}

//deletar o campo de form e o botão dele
function deletar(d) { 
    d.parentNode.remove()
}



//vai salvar os alunos digitados pelo usuario e retorna uma array
    function salvarAlunos() {
    //salvar alunos
        let alunos_nomes = Array()
        let aluno_forms = document.getElementsByClassName('form-aluno-entrada')
        
        //console.log(lista_alunos)
        //console.log(aluno_forms[0].value)
        
        let campos_vazios = 0 
        //vou usar para impedir de imprimir qualquer coisa se houverem campos vazios

        for (var i = 0; i < aluno_forms.length; i++ ) { 
            //console.log(i + " - " +  aluno_forms[i].value)
        
            alunos_nomes.push(aluno_forms[i].value)

            if(aluno_forms[i].value == "") {
                campos_vazios =+ 1
            }
        }
        
        //console.log(alunos_nomes)
        
       

        if(campos_vazios == 0) { 
            return alunos_nomes
        }
            //alert('Erro!')
            return 'Erro'

    }

//vai salvar as wh words selecionadas pelo usuario e retorna um array
function salvarWhWords() { 
        //salvar wh words

        let wh_checkboxes = document.getElementsByClassName('wh-word-check')
        let wh_checados = Array()
        //console.log(wh_checkboxes[0])

        for (var i = 0; i < wh_checkboxes.length; i++) { 
            if(wh_checkboxes[i].checked) {
                wh_checados.push(document.getElementsByClassName('wh-word-labels')[i].innerText)
            }
        }

        //console.log(wh_checados)

        return wh_checados
}
    
//vai salvar os auxs selecionadas pelo usuario e retorna um array

function salvarAuxs() { 
        //salvar auxiliares 


        let aux_checkboxes = document.getElementsByClassName('aux-check')
        var aux_checados = Array()
        //console.log(wh_checkboxes[0])

        for (var i = 0; i < aux_checkboxes.length; i++) { 
            if(aux_checkboxes[i].checked) {
                aux_checados.push(document.getElementsByClassName('aux-labels')[i].innerText)
            }
        }

            //console.log(aux_checados)

            return aux_checados

    }

//realiza o sorteio
function sortearTudo() { 
    
   

    let alunos = sortearAlunos()
    let wh_words = sortearWhQuestions()
    let auxiliares = sortearAuxiliares()

    if(alunos == 'Erro') {
        alert('Existem campos vazios!')
    } else { 

        //console.log(alunos)
        //console.log(wh_words)
        //console.log(auxiliares)

        gravar(1)

        let corpo_tabela = document.getElementById('table_body')

        corpo_tabela.innerHTML = ""
        //limpa a tabela antes de sortear de novo
        for(var i = 0; i < alunos.length; i++) { 
            let linha = corpo_tabela.insertRow()
            //id
            linha.insertCell(0).innerHTML = i + 1
            
            //aluno
            linha.insertCell(1).innerHTML = alunos[i]
            
            //wh word
    
            if(wh_words[i] === undefined) { 
                linha.insertCell(2).innerHTML = "N/A"
            } else { 
                linha.insertCell(2).innerHTML = wh_words[i]
            }
    
            //auxiliares
    
    
            if(auxiliares[i] === undefined) { 
                linha.insertCell(3).innerHTML = "N/A"
            } else { 
                linha.insertCell(3).innerHTML = auxiliares[i]
            }
        }
    }
}

//sorteia os alunos
function sortearAlunos() { 
    let lista_alunos = salvarAlunos()
    //console.log(lista_alunos)

    if(lista_alunos == "Erro") { 
        return 'Erro'
    } else { 

/*
    console.log(lista_alunos) 
    console.log(lista_wh_words) 
    console.log(lista_auxs) */

    //fazer sortear para cada aluno
    var n_sorteados = []
    
    let lista_final = []
    //essa lógica toda a seguir tem o objetivo de fazer com que todos os alunos (pelo indice do array sejam sorteados)
    for (var i = 0; i <= lista_alunos.length; i++) {

        let n_atual //essa variavel vai ser usada para gerar um numero aleatorio
        let debuga_else = 0 //essa variavel vai ser usada para debugar o else, pois em algum momento o valor retornado pelo indexof vai ser sempre != -1 pois todos os valores vão estar na array

        do { 

            n_atual = Math.floor(Math.random() * lista_alunos.length) //numero aleatorio no n atual

            if(n_sorteados.indexOf(n_atual) == -1) { 
                n_sorteados.push(n_atual)
                //console.log("1- PASSOU AQUI ADD NUMERO")
                //add o numero o valor na array
                debuga_else = 0
                //para garantir que o programa não vai sair do do while por causa do debuga else por sorte
                
            } else { 
                //nada
                //console.log("2- PASSOU ELSE")
                debuga_else += 1
                //o programa só vai passar por aqui quando o valor no n atual for encontrado no array de n sorteados, e somente vai passar 100 vezes aqui se todos os valores já estiverem na array, forçando o programa a usar todos os valores possiveis 
                
                if(debuga_else >= 100 ) { 
                    //vai forçar o sistemas a não ficar em um loop eterno

                    n_atual = 999
                    
                }
            }
        } while (n_sorteados.indexOf(n_atual) != -1);

        //console.log("2- SAIU DO DO WHILE")
        //console.log(n_atual)

        //fazer um sistema para o mesmo número não repetir
    }
    
    //console.log(n_sorteados)

    for (let i = 0; i < n_sorteados.length; i++) { 
        //console.log(i + " - " + lista_alunos[n_sorteados[i]])

        lista_final.push(lista_alunos[n_sorteados[i]])
    }

    return lista_final

    }

}

//sorteia as whquestions
function sortearWhQuestions() { 
    let lista_wh_words = salvarWhWords()
    let lista_alunos = salvarAlunos() //preciso dessa variavel para definir o tamanho da array

    let n_sorteados = Array()
    let lista_final = Array()

    for(var i = 0; i < lista_alunos.length; i++)  {
        n_atual = Math.floor(Math.random() * lista_wh_words.length)

        n_sorteados.push(n_atual)

    }

    //console.log("array wh questions: " + n_sorteados)

    for (let i = 0; i < n_sorteados.length; i++) { 
        //console.log(i + " - " + lista_wh_words[n_sorteados[i]])

        lista_final.push(lista_wh_words[n_sorteados[i]])
    }

    return lista_final

}

//sorteios os auxiliares 
function sortearAuxiliares() { 
    let lista_auxs = salvarAuxs()

    let lista_alunos = salvarAlunos() //preciso dessa variavel para definir o tamanho da array

    let lista_final = []
    let n_sorteados = Array()

    for(var i = 0; i < lista_alunos.length; i++)  {
        n_atual = Math.floor(Math.random() * lista_auxs.length)

        n_sorteados.push(n_atual)

    }

    //console.log("Auxiliares: " + n_sorteados)

    for (let i = 0; i < n_sorteados.length; i++) { 
        //console.log(i + " - " + lista_auxs[n_sorteados[i]])

        lista_final.push(lista_auxs[n_sorteados[i]])

    }

    return lista_final

}

//grava no local storage
function gravar(para) { 

    //parametro para vai me dizer se quero contar mais um id ou se só quero pegar o id. 1- criar e contar ids 2-só passar o id

        let alunos = sortearAlunos()
        let wh_words = sortearWhQuestions()
        let auxiliares = sortearAuxiliares()
    
        let lista_tudo = []
    
        //console.log(wh_words)
        //console.log(auxiliares)
    
        lista_tudo.push(alunos)
        lista_tudo.push(wh_words)
        lista_tudo.push(auxiliares)
    
    
        //console.log(listas)
    
        //sistema para ter uma id dinamico
        let id = localStorage.getItem('id')
    
        if(id === null) { 
            localStorage.setItem('id', 0)        
        } 
        
        if (id >= 0) { 
            id = parseInt(localStorage.getItem('id'))
            //console.log(id)

            if(para == 1) { 
                id = id + 1
                localStorage.setItem('id', id)
            } else { 
                return id
            }

        }
    
        localStorage.setItem(id, JSON.stringify(lista_tudo))
    


}

//recupera dados do local storage e imprimi no ultimos sorteios
function recuperar() { 

    let id = gravar(2)

    let paiTabelas = document.getElementById('todos-sorteios-div')

    if(id == 0) { 
        paiTabelas.innerHTML = "Nenhum resultado atualmente"
    }

    let listas = []
   
    for (var i = 1; i <= id; i++) { 

        let dados = localStorage.getItem(i)
        dados = JSON.parse(dados)
        //recuperar os dados da web storage

        listas.push(dados)
    }

    for(var i = id - 1 ; i >= 0; i--) { 
        
        let lista_nomes = listas[i][0]
        let lista_wh = listas[i][1]
        let lista_auxs = listas[i][2]

        //console.log(lista_nomes)
        //console.log(lista_wh)
        //console.log(lista_auxs)
        //console.log('-----')

        //div para cada sorteio
        let divTabela = document.createElement('div')

        divTabela.className = 'tabela-ultimo-sorteio'

        let tableTitle = document.createElement('div')

        tableTitle.innerHTML = 'Sorteio ID <span class="id-table">' + (i + 1) +  '</span>'

        divTabela.appendChild(tableTitle)
        

        paiTabelas.appendChild(divTabela)

        //criar uma tabela
        let tabela = document.createElement('table')

        tabela.className = "table table-hover"

        divTabela.appendChild(tabela)

        //criar thead da tabela
        let tabelaCabeca = document.createElement('thead')

        var rowHead = tabelaCabeca.insertRow(0);

        rowHead.insertCell(0).innerHTML = '#'

        rowHead.insertCell(1).innerHTML = 'Aluno'
        
        rowHead.insertCell(2).innerHTML = 'WH Words'

        rowHead.insertCell(2).innerHTML = 'Auxiliares'

        tabela.appendChild(tabelaCabeca)

        //criar o corpo da tabela

        let tabelaCorpo = document.createElement('tbody')


        for (let j = 0; j < lista_nomes.length; j++) { 
            var rowBody = tabelaCorpo.insertRow(0);

            rowBody.insertCell(0).innerHTML = j + 1

            rowBody.insertCell(1).innerHTML = lista_nomes[j]



            if(lista_auxs[j] === null) {
                rowBody.insertCell(2).innerHTML = 'N/A'
            } else { 
                rowBody.insertCell(2).innerHTML = lista_auxs[j]
            }

            if(lista_wh[j] === null) { 
                rowBody.insertCell(3).innerHTML = 'N/A'
            } else {
                rowBody.insertCell(3).innerHTML = lista_wh[j]
            }

        }

        tabela.appendChild(tabelaCorpo)

        let btnDelete = document.createElement('button')
        btnDelete.innerText = "Excluir esse sorteio"
        btnDelete.className = "btn btn-danger mt-2"
        btnDelete.setAttribute('onclick', 'deletaBD(this)')

        tabela.appendChild(btnDelete)
    }
}

function deletaBD(d) { 

    

    //a partir dqui remove do bd
    let id = parseInt(d.parentNode.parentNode.firstChild.lastChild.innerHTML)

    console.log(id)
    localStorage.removeItem(id)

    d.parentNode.parentNode.remove() //remove da lista
    
}