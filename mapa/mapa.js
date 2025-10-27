
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Carregado. Iniciando script mapa.js...");

    // --- PARTE 1: MAPA 
    const mapSvgStates = document.querySelectorAll('#map .model .state');
    const stateInfoBoxes = document.querySelectorAll('.parca .estado');
    const selectElement = document.getElementById('seletory');

    if (mapSvgStates.length === 0) {
        console.warn("Nenhum estado SVG encontrado com o seletor '#map .model .state'. Verifique o SVG e o seletor.");
    }

    function showStateInfo(stateAbbreviation) {
        mapSvgStates.forEach(state => state.classList.remove('active'));
        stateInfoBoxes.forEach(box => box.classList.remove('active'));

        const lowerCaseAbbreviation = stateAbbreviation ? stateAbbreviation.toLowerCase() : '';

        if (lowerCaseAbbreviation) {
            const activeState = document.querySelector(`#state_${lowerCaseAbbreviation}`);
            const activeInfoBox = document.querySelector(`#box_${lowerCaseAbbreviation}`);

            if (activeState) {
                activeState.classList.add('active');
            } else if (stateAbbreviation){ 
                 console.warn(`Elemento SVG #state_${lowerCaseAbbreviation} não encontrado.`);
            }

        }

        if (selectElement && selectElement.value !== lowerCaseAbbreviation) {
             selectElement.value = lowerCaseAbbreviation;
        }
    }

    // --- PARTE 2: CARD WHATSAPP ---
    const officesData = {
    "MG": { name: "Minas Gerais", areas: "Direito Empresarial, Tributário", whatsapp: "5531987654321" },
    "SP": { name: "São Paulo", areas: "Direito Civil, Contratos", whatsapp: "5511912345678" },
    "RJ": { name: "Rio de Janeiro", areas: "Direito Trabalhista, Família", whatsapp: "5521987654321" },
    "RO": { name: "Rondônia", areas: "Direito Ambiental, Agrário", whatsapp: "5569911223344" },
    "ES": { name: "Espírito Santo", areas: "Consulte nossas áreas de atuação", whatsapp: "5527900000000" },
    "DF": { name: "Distrito Federal", areas: "Consulte nossas áreas de atuação", whatsapp: "5561900000000" },
    "BA": { name: "Bahia", areas: "Consulte nossas áreas de atuação", whatsapp: "5571900000000" },
    "MA": { name: "Maranhão", areas: "Consulte nossas áreas de atuação", whatsapp: "5598900000000" },
    "RN": { name: "Rio Grande do Norte", areas: "Consulte nossas áreas de atuação", whatsapp: "5584900000000" },
    "PE": { name: "Pernambuco", areas: "Consulte nossas áreas de atuação", whatsapp: "5581900000000" },
    "RS": { name: "Rio Grande do Sul", areas: "Consulte nossas áreas de atuação", whatsapp: "5551900000000" },
    "SC": { name: "Santa Catarina", areas: "Consulte nossas áreas de atuação", whatsapp: "5548900000000" },
    "PR": { name: "Paraná", areas: "Consulte nossas áreas de atuação", whatsapp: "5541900000000" },
    "GO": { name: "Goiás", areas: "Consulte nossas áreas de atuação", whatsapp: "5562900000000" },
    "AC": { name: "Acre", areas: "Consulte nossas áreas de atuação", whatsapp: "5568900000000" },
    "CE": { name: "Ceará", areas: "Consulte nossas áreas de atuação", whatsapp: "5585900000000" },
    "AM": { name: "Amazonas", areas: "Consulte nossas áreas de atuação", whatsapp: "5592900000000" },
    "AL": { name: "Alagoas", areas: "Consulte nossas áreas de atuação", whatsapp: "5582900000000" },
    "AP": { name: "Amapá", areas: "Consulte nossas áreas de atuação", whatsapp: "5596900000000" },
    "MS": { name: "Mato Grosso do Sul", areas: "Consulte nossas áreas de atuação", whatsapp: "5567900000000" },
    "MT": { name: "Mato Grosso", areas: "Consulte nossas áreas de atuação", whatsapp: "5565900000000" },
    "PA": { name: "Pará", areas: "Consulte nossas áreas de atuação", whatsapp: "5591900000000" },
    "PB": { name: "Paraíba", areas: "Consulte nossas áreas de atuação", whatsapp: "5583900000000" },
    "PI": { name: "Piauí", areas: "Consulte nossas áreas de atuação", whatsapp: "5586900000000" },
    "RR": { name: "Roraima", areas: "Consulte nossas áreas de atuação", whatsapp: "5595900000000" },
    "SE": { name: "Sergipe", areas: "Consulte nossas áreas de atuação", whatsapp: "5579900000000" },
    "TO": { name: "Tocantins", areas: "Consulte nossas áreas de atuação", whatsapp: "5563900000000" }
};
    const whatsappOverlay = document.getElementById('whatsappOverlay');
    const infoCard = document.getElementById('infoCard');
    const cardStateName = document.getElementById('cardStateName');
    const cardAreas = document.getElementById('cardAreas');
    const whatsappButton = document.getElementById('whatsappButton');
    const closeCardButton = document.getElementById('closeCard');
    const stateListItems = document.querySelectorAll('.lista-estados li');

    // Verificações Iniciais de Elementos do Card
    if (!whatsappOverlay) console.error("ELEMENTO NÃO ENCONTRADO: Overlay com ID 'whatsappOverlay'.");
    if (!infoCard) console.error("ELEMENTO NÃO ENCONTRADO: Card com ID 'infoCard'.");
    if (!cardStateName) console.error("ELEMENTO NÃO ENCONTRADO: Span/Elemento com ID 'cardStateName'.");
    if (!cardAreas) console.error("ELEMENTO NÃO ENCONTRADO: Span/Elemento com ID 'cardAreas'.");
    if (!whatsappButton) console.error("ELEMENTO NÃO ENCONTRADO: Botão/Link com ID 'whatsappButton'.");
    if (!closeCardButton) console.error("ELEMENTO NÃO ENCONTRADO: Botão Fechar com ID 'closeCard'.");


    function openWhatsappCard(stateCode) {
        // Verifica se os elementos cruciais existem antes de prosseguir
        if (!whatsappOverlay || !infoCard || !cardStateName || !cardAreas || !whatsappButton) {
            console.error("Não é possível abrir o card. Elementos essenciais não encontrados.");
            return;
        }

        const upperCaseStateCode = stateCode ? stateCode.toUpperCase() : '';
        const data = officesData[upperCaseStateCode];

        if (data) {
            cardStateName.textContent = data.name;
            cardAreas.textContent = data.areas;

            const whatsappMessage = `Olá, gostaria de falar com um advogado em ${data.name}.`;
            const whatsappLink = `https://wa.me/${data.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
            whatsappButton.href = whatsappLink;

            whatsappOverlay.classList.add('show');
            console.log("Card aberto/atualizado para:", upperCaseStateCode);
        } else {
            console.warn(`Dados de WhatsApp NÃO encontrados para o estado: ${upperCaseStateCode}. Fechando card.`);
            // Fecha o card se clicar em estado sem dados cadastrados
            closeWhatsappCard();
        }
    }

    function closeWhatsappCard() {
        if (!whatsappOverlay) return;

        // Só executa se o card estiver realmente visível
        if (whatsappOverlay.classList.contains('show')) {
             whatsappOverlay.classList.remove('show');
             console.log("Card fechado.");
             showStateInfo(''); 
        }
    }

    // --- PARTE 3: EVENTOS ---

    // GATILHO 1: Clique no MAPA SVG
    mapSvgStates.forEach(state => {
        state.addEventListener('click', (event) => {
            event.preventDefault();
            const stateAbbreviation = state.dataset.state; 
            console.log("Clique no mapa:", stateAbbreviation);
            if (stateAbbreviation) {
                showStateInfo(stateAbbreviation);
                openWhatsappCard(stateAbbreviation);
            }
        });
    });

    // GATILHO 2: Clique na LISTA
    stateListItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.textContent;
            const match = text.match(/\(([^)]+)\)/); 

            if (match && match[1]) {
                const stateCode = match[1]; 
                console.log("Clique na lista:", stateCode);

                showStateInfo(stateCode.toLowerCase()); 
                openWhatsappCard(stateCode); 
            }
        });
    });

    // GATILHO 3: Mudança no Dropdown (se existir)
    if (selectElement) {
        selectElement.addEventListener('change', () => {
            const selectedState = selectElement.value; 
             console.log("Dropdown alterado:", selectedState);
            if (selectedState) {
                 showStateInfo(selectedState);
                 openWhatsappCard(selectedState);
            } else {
                 closeWhatsappCard();
            }
        });
    }

    // GATILHO 4: Clique no Botão FECHAR (X)
    if (closeCardButton) {
        closeCardButton.addEventListener('click', (event) => {
             event.stopPropagation();
             console.log("Botão Fechar clicado.");
             closeWhatsappCard();
        });
    }

    // GATILHO 5: Clique no OVERLAY (fora do card)
    // Verifica se o overlay foi encontrado
    if (whatsappOverlay) {
        whatsappOverlay.addEventListener('click', (event) => {
            if (event.target === whatsappOverlay) {
                console.log("Clique fora do card (no overlay).");
                closeWhatsappCard();
            }
        });
    }

});