const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '..', 'livro-mapas-mentais.md');
let content = fs.readFileSync(mdPath, 'utf8');

const newIntro = `## Introdução Geral

### 1. Contextualização e Objeto de Estudo
Na realidade atual, vivemos na Era da Informação e da Inteligência Artificial, o que proporciona o consumo de um volume massivo de dados por meio da automação inteligente, de algoritmos avançados e da inteligência artificial generativa, transformando o nosso quotidiano e a forma como trabalhamos. As inovações tecnológicas oferecem uma carga contínua de dados, exigindo discernimento crítico na triagem do que é verdadeiro ou falso, capacidade de processamento e retenção daquilo que se aprende e a conversão de dados em conhecimento aplicável.

Contudo, as metodologias de estudo e os sistemas de registo documental predominantes nas instituições formais de ensino e no ambiente corporativo permanecem ancorados no modelo tradicional de escutar e anotar, caracterizado por uma lógica cartesiana e linear. Muitas escolas e empresas ainda operam sob o paradigma da «linha de montagem intelectual», herdada diretamente do racionalismo cartesiano do século XVII e do modelo da Revolução Industrial [1].

O filósofo e matemático René Descartes postulou o método de dividir cada dificuldade em tantas partes quantas fossem possíveis para melhor as resolver. Embora essa abordagem analítica tenha sido e continue a ser basilar para a evolução científica, a sua aplicação descontextualizada gerou efeitos colaterais fragmentadores, que podem ser superados ao valorizar-se a complementaridade e a visão sistémica do saber [7].

Um desses problemas manifesta-se na rigidez curricular, na qual as matérias são ensinadas de forma compartimentada — o aluno frequenta 50 minutos de Matemática seguidos de 50 minutos de História, muitas vezes sem compreender as pontes epistemológicas entre os dois domínios. No ecossistema empresarial, esse padrão reflete-se na criação de departamentos estanques e na falta de comunicação fluida entre setores.

Outro desdobramento clássico é a cisão mente-corpo. O cartesianismo privilegiou o cogito, o pensamento abstrato e puramente lógico, em detrimento das dimensões afetivas, sensoriais e estéticas. Consequentemente, o registo documental tradicional restringe-se quase exclusivamente ao texto formal contínuo, ignorando a multiplicidade de canais comunicativos [1].

Esse modelo de fluxo estático pressupõe um ciclo previsível de entrada, processamento e saída: o aluno lê o texto, redige um resumo e faz o teste; o colaborador recebe o memorando, preenche a folha de cálculo e gera um ficheiro em PDF. As estruturas de arquivo — de gavetas metálicas a pastas digitais aninhadas — continuam a refletir uma hierarquia rígida que entra em conflito com a organização em rede que caracteriza a era digital contemporânea [7].

Diante disso, evidencia-se um descompasso com os multiletramentos. Enquanto o método tradicional preconiza a redução para aprofundar, as exigências atuais demandam integração para ampliar. O contexto sociocultural exige competências multimodais e hipertextuais; a informação distribui-se em redes integradas e é absorvida por meio de linguagens diversas. Persistir em blocos textuais unicolores e sequenciais contraria os avanços consolidados da psicologia cognitiva e da neurobiologia acerca do funcionamento dinâmico do cérebro [4, 6].

Nesse cenário de sobrecarga informacional, os mapas visuais de aprendizagem surgem como uma alternativa metodológica consistente. Idealizados pelo britânico Tony Buzan na virada para a década de 1970 [5, 6], os mapas mentais superam os diagramas puramente decorativos: constituem uma linguagem gráfica estruturada a partir do pensamento irradiante e associativo [6]. A sua estrutura orgânica e radial ramifica-se a partir de um núcleo gerador, espelhando macroscopicamente a morfologia neuronal e sináptica e operando em harmonia com os processos naturais de associação da mente [1, 6].

### 2. Por que estudar os mapas mentais?
Embora reconhecidos como ferramentas de organização visual, as aplicações dos mapas mentais ultrapassam a simples esquematização técnica. Torna-se imperativo examinar como participam na estruturação cognitiva, as suas funções práticas e as suas delimitações metodológicas [1].

Aprender um determinado assunto não garante, por si só, que a pessoa consiga explicá-lo com clareza, integrá-lo com outros saberes ou formular um posicionamento crítico. O contacto com dados densos pode coexistir com dificuldades reais na hora de verbalizar ou redigir aquilo que foi lido.

A ESDHUBEM (Escola de Desenvolvimento Humano e Bem-Estar) toma essa problemática como ponto de partida para estruturar experiências pedagógicas que conjugam a assimilação de conteúdos com a prática do pensamento crítico, da redação autoral e da comunicação verbal. Sob esse prisma, o mapa mental é um catalisador de estruturação e síntese de ideias, sem ser considerado uma solução mágica e isolada para todas as lacunas de aprendizagem.

É nesse contexto que se fundamenta a Tríade Mental-Verbal, abordagem da nossa escola que articula a organização cognitiva das ideias, a composição escrita e a transmissão oral. O mapa mental cumpre o papel de arquitetura e ordenação conceitual; a produção escrita aprofunda as relações estabelecidas; e a expressão oral proporciona a partilha viva do saber elaborado, convertendo o estudo mecânico num processo de consolidação de competências.

### 3. Problema de Pesquisa: A Lacuna entre o Ensinar o "Quê" e o Aprender o "Como"
Nas matrizes de ensino tradicionais, as instituições empenham-se em cumprir currículos extensos e exigir domínio de conteúdo em exames complexos. Todavia, quase nunca ensinam métodos metacognitivos de como aprender [1]. Presume-se, de modo ingénuo, que as competências de filtrar, categorizar, sintetizar e reter dados sejam talentos inatos, cabendo a cada aluno encontrar soluções por conta própria [1].

Sem orientações explícitas sobre estratégias metacognitivas, o estudante frequentemente adota a cópia mecânica das matérias. Passa horas transcrevendo diapositivos ou a fala dos professores, o que fomenta aquilo que a psicologia cognitiva designa como «ilusão de competência»: a sensação física de produtividade enquanto o cérebro atua quase de forma passiva, com baixa retenção profunda.

Por vezes, surge o esforço espontâneo de conectar conceitos dispersos com setas no papel. Contudo, na ausência de parâmetros estruturados de hierarquia conceitual, códigos visuais e categorização, esses esquemas perdem-se na desorganização e falham na retenção duradoura [1].

Essa lacuna foi a principal motivação de Tony Buzan na década de 1960: perante a saturação académica e a constatação de que anotações lineares extensas provocavam fadiga mental sem melhorar a retenção nos testes, buscou alternativas para rentabilizar as faculdades cognitivas [1, 6].

O objetivo deste trabalho não é desqualificar a anotação contínua nem opor-se ao ensino formal. O propósito da ESDHUBEM e da Tríade Mental-Verbal é atuar de forma complementar, providenciando técnicas que convertam a cópia passiva em filtragem ativa (micromapeamento), estruturação lógica (microescrita) e apropriação comunicativa (microverbalização).

A partir deste enquadramento, estabelecem-se as seguintes perguntas de investigação:
- De que maneira os fundamentos conceituais, neurológicos e metodológicos dos mapas mentais podem colmatar a escassez de um ensino explícito sobre "como aprender", capacitando o estudante a superar a cópia mecânica e a gerir a informação de modo ativo?
- Em que medida a articulação sequencial entre a síntese visual do mapa, a produção escrita e a expressão oral — pilares da Tríade Mental-Verbal — constitui um micro-hábito autorregulador sustentável para o processamento autónomo de grandes volumes de informação?

### 4. Justificativa
A justificação desta proposta apoia-se na necessidade de valorizar recursos que envolvam de forma plena o potencial cognitivo do sujeito [1]. Enquanto as abordagens puramente lineares estimulam quase com exclusividade os processos lógicos e analíticos do hemisfério esquerdo, deixam em segundo plano o processamento espacial, sintético e imagético do hemisfério direito [1, 4, 6].

A análise dos mapas mentais sob a perspetiva da coordenação inter-hemisférica ampara-se no princípio da dupla codificação (Paivio) e no fortalecimento de pistas visuo-verbais de recuperação da memória [1, 4], bem como em abordagens integrativas dos processos mentais [9].

No plano pedagógico, o estudo fundamenta-se na articulação entre a técnica de Buzan, a Teoria da Aprendizagem Significativa de David Ausubel [11] e as práticas reflexivas e metacognitivas analisadas por Antonio Ontoria Peña et al. [1]. O mapa mental converte-se no reflexo visual da organização interna do estudante, permitindo a autorregulação do estudo e a visualização imediata de conceitos que precisam de consolidação [1].

No contexto atual de transição digital, hipertextualidade e trabalho colaborativo, os mapas mentais, a composição textual e a comunicação oral demonstram ampla aplicabilidade transdisciplinar [2]. O método apoia tanto processos de ideação e cocriação em dinâmicas de brainstorming, brainwriting e design participativo [3], quanto a estruturação do raciocínio analítico e do pensamento divergente em diversas áreas do conhecimento [8].

### 5. A Aprendizagem Integrativa: Uma Ponte para o Desenvolvimento Humano
O processo de aprendizagem não se circunscreve a um período letivo nem ao espaço escolar formal. A educação institucional desempenha um papel insubstituível de validação científica e técnica; contudo, a formação do indivíduo insere-se no horizonte da aprendizagem contínua (lifelong learning) [1].

Longe de competir com os parâmetros oficiais, a pedagogia aberta e integrativa oferece suporte prático ao sujeito que aprende. Enquanto o currículo regular prioriza a entrega programática, a ESDHUBEM e a Tríade Mental-Verbal concentram-se no fortalecimento das competências de processamento e expressão do aprendiz.

A integração entre traçar, redigir e verbalizar constrói uma dinâmica de autorregulação que capacita o indivíduo a:
- **Mapear:** sintetizar conteúdos complexos visualmente, facilitando a identificação da hierarquia conceitual [1, 3];
- **Escrever:** desenvolver argumentos estruturados a partir das conexões visuais previamente delineadas;
- **Verbalizar:** transmitir as conclusões com segurança e vocabulário assertivo, desenvolvendo a competência comunicativa.

### 6. Objetivos
#### Objetivo Geral
Analisar os pilares teóricos, cognitivos e práticos dos mapas mentais, examinando as suas potencialidades e limitações enquanto instrumentos de processamento de informação, representação conceitual, fixação mnemónica e incentivo à aprendizagem significativa e autorregulada nos contextos escolar, académico e organizacional.

#### Objetivos Específicos
- Investigar a génese histórica do mapa mental desenvolvida por Tony Buzan e as suas críticas aos registos textuais exclusivamente lineares [1, 6].
- Analisar a analogia das redes neuronais e dendríticas na estrutura radial do mapa mental [1, 6], estabelecendo a distinção técnica face aos mapas conceituais de Joseph Novak [10].
- Examinar os processos cognitivos associados à integração de estímulos verbais e visuais para a retenção, organização e evocação da informação [1, 4].
- Sistematizar as leis de elaboração cartográfica de Buzan e a sua aplicação prática articulada a estratégias divergentes e colaborativas, como o brainstorming e o brainwriting [1, 3, 6].
- Mapear o suporte das ferramentas digitais no desenvolvimento individual e em equipa dos mapas mentais e analisar a sua aplicação prática na leitura ativa e no ensino superior [1].

### 7. A Proposta Pedagógica da ESDHUBEM
A ESDHUBEM é uma escola dedicada ao desenvolvimento humano e ao bem-estar que busca integrar o estudo de diferentes assuntos ao aperfeiçoamento das capacidades de compreender, relacionar ideias, aprofundar o pensamento, escrever e comunicar conhecimentos.

A nossa proposta parte da compreensão de que ter acesso à informação não significa, necessariamente, conseguir interpretá-la, relacioná-la a outros conhecimentos ou explicá-la com clareza. Por isso, os cursos não se limitam à apresentação de conteúdos: também oferecem oportunidades para que o estudante trabalhe intelectualmente com aquilo que aprende.

Com o apoio da Tríade Mental-Verbal, a escola propõe um percurso que integra a organização das ideias, a elaboração escrita e a expressão oral. O estudante é incentivado a ir além da reprodução de informações, desenvolvendo a capacidade de construir explicações próprias, registrar suas reflexões e compartilhar o conhecimento elaborado.

Dessa forma, o desenvolvimento humano e o bem-estar constituem os campos de estudo, enquanto o aperfeiçoamento do pensamento, da escrita e da comunicação integra a proposta formativa da escola.

A ESDHUBEM oferece duas dimensões na aprendizagem:
- **O que a pessoa estuda:** consciência, autoconhecimento, relações humanas, bem-estar e outros temas de desenvolvimento humano.
- **Como a pessoa aprende a trabalhar com o que estuda:** organizar ideias, estabelecer relações, elaborar textos, explicar conceitos e compartilhar conhecimento, com o apoio da Tríade Mental-Verbal.

Saber que nossa aprendizagem tem como objetivo desenvolver um método de ensino para uma dimensão de assuntos que, em geral, não estão inseridos nas opções oficiais de ensino é fundamental. Essa distinção permite oferecer cursos sobre temas muito distintos sem perder a identidade pedagógica da escola. Essa delimitação contribui para a formatação do conteúdo de cada curso, compreendendo as suas especificidades, enquanto a maneira de trabalhar com o conhecimento mantém uma orientação comum.

Existe, ainda, uma consequência importante para este projeto: a Tríade Mental-Verbal não visa substituir nenhum outro método de estudo, leitura ou ferramenta visual. Ela atua como um princípio organizador que articula essas práticas dentro da proposta pedagógica da ESDHUBEM.

### 8. Da Organização Linear à Organização Visual do Conhecimento
Grande parte dos modelos de anotação organiza-se de maneira linear — frases, listas e parágrafos contínuos. Essa estrutura é valiosa para a argumentação discursiva detalhada, mas apresenta limitações na visualização global e simultânea das inter-relações entre múltiplos tópicos [1].

Os mapas mentais operam por radiação: situam um tema central de onde derivam ramificações principais e secundárias, tornando visíveis as categorias conceituais e os seus pontos de ligação [1, 6]. Isso não significa a supremacia de um modelo sobre o outro, mas sim a sua complementaridade: a síntese gráfica organiza o quadro panorâmico, enquanto o texto desenvolve a argumentação em profundidade [1]. O desafio está em articular os dois recursos de forma estratégica, sem reduzir o mapa a um fim estético, mas utilizando-o como alicerce para a reflexão, a redação crítica e a comunicação oral.

`;

const startIdx = content.indexOf('## Introdução Geral');
const endIdx = content.indexOf('## Capítulo 1: Fundamentos');

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newIntro + content.substring(endIdx);
  fs.writeFileSync(mdPath, content, 'utf8');
  console.log('livro-mapas-mentais.md updated with new Introduction successfully!');
} else {
  console.error('Could not find Introduction markers!');
}
