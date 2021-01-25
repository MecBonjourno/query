let ideas = [];
let ideaId = "";

// This Function is called when the user is Logged In to display info on the HTML
function isLoggedIn(){
    document.getElementById('ideaDiv').style.display = 'flex';
}

// This Functions are used to set the modal card of a new Idea to be registered
function hideModal(){
    document.getElementById('myModal').style.display = 'none';
}

// Stars the Form 
function createNewIdea(){
    window.location = "form.html";
}

// Renders the ideas on the Ideas Dashboard
function showIdeas () {
     db.collection(`users/${userId}/ideas`).get().then( snapshot => {
        snapshot.forEach( idea => {
            ideas.push({title: idea._document.proto.fields.title.stringValue,
                        score: idea._document.proto.fields.score.integerValue,
                        tips: idea._document.proto.fields.tips.stringValue,
                        nextQuestionId: idea._document.proto.fields.nextQuestionId.integerValue
            });
        })
    }).then( () => {
        const ideaDiv = document.getElementById('ideaDiv');
        let html = '';
        ideas.forEach( (idea , index) => {
            const div = `
                <div id="renderedIdea" >
                    <button  class="ideaBtn" id="${index}" onclick="seeIdea(this.id)" >
                    <div>${idea.title}</div>
                    </button>
                </div>
            `;
            html += div;
        } );
        ideaDiv.innerHTML = html;
    })
}
function seeIdea(id) {
    ideaId = id;
    document.getElementById('dashboardDiv').style.display = 'block';
    document.getElementById('ideaTitle').innerText = ideas[ideaId].title;
    document.getElementById('ideaTips').innerText = ideas[ideaId].tips;
    document.getElementById('ideaScore').innerText = ideas[ideaId].score;
    document.getElementById('dashboardDiv').style.display = 'none';
    document.getElementById('continueFormBtn').style.display = 'block';
}




// THE FOLLOWING CODE IS RESPONSIBLE FOR THE LOGIC BEHIND THE FORM 

const questions = ["Você já fez Algum Planejamento de Carreira?", "Tem vontade de ser empreendedor?", "Possui seu currículo estruturado?", "Você conhece quais são as suas competências âncoras?", "Você sabe quais competências precisa desenvolver?", "Você ja descobriu o que mais gosta de fazer?", "Você já fez algum trabalho voluntário?", "Você sabe fazer projetos?", "Já participou de algum programa de liderança ( AIESEC; Junior Achievement, etc.) ?", "Você tem uma ideia de empreendimento?", "Você sabe qual o problema o seu produto está resolvendo?", "Você já sabe para que é o seu produto?", "Sabe o perfil de quem vai usá-lo?", "Sabe qual é a finalidade do seu produto? A que se aplica?", "Sabe qual é a tecnologia envolvida?", "Quantos potenciais clientes existem nesse mercado?", "Quem faz um produto similar na perspectiva do seu cliente?", "Você já construiu a proposta de valor?", "Você já tem um parceiro ou futuro sócio, que compartilha seu sonho?", "Você já construiu a persona do seu negócio?", "Você sabe o que é um modelo de negócios?", "Você tem clareza do diferencial do seu negócio?", "Você tem uma estratégia inicial para começar?", "Você já fez uma mentoria?", "Você já tem um time?", "Você já definiu os valores do negócio?", "Você já utilizou um Canvas?", "Você sabe quais os principais canais para acessar clientes?", "Você tem mapeado como o usuário usa o seu produto?", "Você tem recursos financeiros iniciais a investir?", "Você dispõe de tempo para empreender?", "Você gostaria de participar de um programa para startups?", "Você já desenvolveu alguma versão do seu produto?", "Você já fez experimentos com seu produto/serviço?", "Você já contatou uma lista de 10 primeiros usuários?", "O seu produto é tecnológico?", "Conhece alguma métrica de startups?", "Você sabe o que é escalabilidade?", "Você já tem MVP?", "Você já fez um pitch?", "Você já tem registro/CNPJ?", "Você já sabe quais são os resultados de vendas do seu produto?", "Você sabe quanto o usuário/cliente deverá pagar?", "Você sabe calcular as receitas e os custos?", "Você tem um investidor?", "Você sabe calcular o custo de aquisição de clientes?", "Você já mapeou o processo de vendas?", "Você já fez marketing para o seu negócio?"];
let questionId = 0;
let userScore = 0;
let isNewIdea = true;

// Handles Positive Answers on the Form
function yesAnswer(){
    if(questionId < questions.length - 1){
        userScore++;
        questionId++;
        document.getElementById("question").innerText = questions[questionId];
    } else{
        finishQuestionary();
    }
}

//Handles Negative Answers on the Form
function noAnswer(){
    if( questionId === 0 || questionId === 9 || questionId === 17 || questionId === 24 || questionId === 32 || questionId === 40 ){
        finishQuestionary()
    } else {
        questionId++;
        document.getElementById("question").innerText = questions[questionId]; 
    }
}

// Ends Current Form
function finishQuestionary(){
    document.getElementById("yesBtn").style.display = 'none';
    document.getElementById("noBtn").style.display = 'none';
    document.getElementById("question").style.display = 'none';
    document.getElementById("newFormBtn").style.display = 'block';
    document.getElementById("image").style.display = 'block';
    document.getElementById("tips").style.display = 'flex';
    document.getElementById("nextStep").style.display = 'block';
    let tips = "";
    if (userScore === 0) tips = "- Aconselhamento de Carreiras\n - TECNOPUC Experience\n -  Tour TECNPUC";
    else if (userScore > 0 && userScore<=4)tips = "- Evento Ideação";
    else if (userScore>= 5 && userScore<=9)tips = "- Disciplinas 360";
    else if (userScore === 10)tips = "- Disciplina Projetos Desafios da Escola de Negocios\n - Disciplina Laboratorio de Criatividade  e Inovacao";
    else if (userScore>= 11 && userScore<=14)tips = "- Evento Ideacao";
    else if (userScore>= 15 && userScore<=18)tips = "- Torneio Empreendedor ";
    else if (userScore>= 19 && userScore<=22)tips = " - Disciplinas de empreendorismo das escolas PUCRS 360 \n - Torneio Empreendedor \n - Programa Apple Developer Academy \n - Cursos EDUCON";
    else if (userScore>= 23 && userScore<=26)tips = "- Maratonas e eventos de empreendedorismo \n - Programa Rocket Idear ";
    else if (userScore>= 27 && userScore<=30)tips = "- Discilpinas sobre Criatividade e Tecnologia PUCRS \n - Laboratório de Modelagem ";
    else if (userScore>= 31 && userScore<=34)tips = "- Programa Startup Garagem \n ";
    else if (userScore>= 35 && userScore<=38)tips = "- Disciplinas e Certificações de estudos focados em negócios PUCRS \n ";
    else if (userScore>= 39 && userScore<=42)tips = "- Programa Pré-Startup \n ";
    else if (userScore>= 43 && userScore<=50)tips = "- Programa de Desenvolvimento de Startups do TECNOPUC \n ";
    document.getElementById("tipsH3").innerText = tips;
    if( isNewIdea == true ){
        const ideaName = document.getElementById('ideaName').value;
        db.collection(`users/${userId}/ideas`).doc(ideaName).set({
            title: ideaName,
            score: userScore,
            tips: tips,
            nextQuestionId: questionId
        })
    } else {
        db.collection(`users/${userId}/ideas`).doc(ideas[ideaId].title).update({
            score: userScore,
            tips: tips,
            nextQuestionId: questionId
        })
    }
}

function continueForm(){
    document.getElementById('idea').style.display = 'none';
    isNewIdea = false;
    userScore = ideas[ideaId].score;
    questionId = parseInt(ideas[ideaId].nextQuestionId);
    document.getElementById('continueForm').style.display= 'flex';
    document.getElementById('question').innerText = questions[questionId];
}

function startNowBtn(){
    window.location='signUp.html'
}

function showMenu(){
    document.getElementById('menu').style.display = 'block';
}

function closeMenu(){
    document.getElementById('menu').style.display = 'none';
}

function  goToDashboard (){
    window.location='dashboard.html'
}

function sendRating(){
    let ratingTitle = document.getElementById('titleInput').value;
    let ratingBody = document.getElementById('bodyInput').value;
    db.collection('ratings').doc(userId).set({
        title: ratingTitle,
        body: ratingBody,
        timestamp: new Date()
    }).then( () => {
        alert('Avaliação Enviada com Sucesso')
    } )
    setTimeout( () => { window.location = 'dashboard.html' }, 2000 )
}