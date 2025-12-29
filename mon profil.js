function detailPrime(id) {
    const details = [
        { cible: 'Baron Noir', prime: 5000, info: 'Repéré au port.' },
        { cible: 'Seigneur des Ombres', prime: 12000, info: 'Château fortifié.' },
        { cible: 'Le Traître', prime: 25000, info: 'Taverne du Corbeau.' }
    ];
    const d = details[id-1];
    
    ouvrirModal(
        `💰 ${d.cible}`,
        `
            <p><strong>Prime:</strong> ${d.prime} or</p>
            <p><strong>Localisation:</strong> ${d.info}</p>
            <p><em>Niveau: Expert</em></p>
        `,
        [  // ← TES BOUTONS ICI
            { 
                text: '🗡️ Accepter Mission', 
                action: `accepterPrime(${id})` 
            },
            { 
                text: '📋 Voir Profil Cible', 
                action: `profilCible(${id})` 
            },
            { 
                text: '❌ Fermer', 
                action: 'fermerModal()' 
            }
        ]
    );
}
