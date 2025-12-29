function detailPrime(id) {
    const details = [
        { cible: 'Baron Noir', prime: 5000, info: 'Repéré au port. Garde lourde.' },
        { cible: 'Seigneur des Ombres', prime: 12000, info: 'Château fortifié. Passage secret nord.' },
        { cible: 'Le Traître', prime: 25000, info: 'En fuite. Dernière vue: taverne du Corbeau.' }
    ];
    const d = details[id-1];
    
    ouvrirModal(
        `💰 Prime: ${d.cible}`,
        `<p><strong>Prime:</strong> ${d.prime} or</p>
         <p><strong>Infos:</strong> ${d.info}</p>
         <p><em>⚠️ Niveau recommandé: Expert</em></p>`,
        [
            { text: 'Accepter Mission', action: `accepterPrime(${id})` },
            { text: 'Fermer', action: 'fermerModal()' }
        ]
    );
}

// Modal functions
function ouvrirModal(titre, contenu, boutons = []) {
    document.getElementById('modal-header').innerHTML = `<h3>${titre}</h3>`;
    document.getElementById('modal-body').innerHTML = contenu;
    document.getElementById('modal-footer').innerHTML = boutons.map(btn => 
        `<button onclick="${btn.action}">${btn.text}</button>`).join('');
    document.getElementById('modalGuilde').style.display = 'block';
}

function fermerModal() {
    document.getElementById('modalGuilde').style.display = 'none';
}

// Fermeture modal (clic X, backdrop, Escape)
document.getElementById('modalGuilde').onclick = function(e) {
    if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) fermerModal();
};
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fermerModal();
});


function detailQuete(i) {
    ouvrirModal(
        `🎯 ${quetes[i].cible}`,
        `<p><strong>Prime:</strong> ${quetes[i].prime} or</p>
         <p><strong>Statut:</strong> ${quetes[i].termine ? '✅ Terminée' : '⏳ Active'}</p>`,
        [
            { text: '✏️ Modifier', action: `modifierQuete(${i})` },
            { text: '❌ Fermer', action: 'fermerModal()' }
        ]
    );
}
