  let quetes = JSON.parse(localStorage.getItem('quetesAssassins')) || [];
        let totalOr = parseInt(localStorage.getItem('totalOr')) || 0;

        function posterQuete() {
            const cible = document.getElementById('cibleInput').value.trim();
            const prime = parseInt(document.getElementById('primeInput').value);
            if (cible && prime >= 50) {
                quetes.push({ cible, prime, termine: false });
                document.getElementById('cibleInput').value = '';
                document.getElementById('primeInput').value = '';
                sauvegarder();
                afficherQuetes();
                switchRole('assassin');
                initBoutonProfil();
            }
        }

                function getLastMember() {
            const membres = JSON.parse(localStorage.getItem('membresGuilde')) || [];
            return membres[membres.length - 1] || null;
        }

        function initBoutonProfil() {
            const membre = getLastMember();
            const btn = document.getElementById('btnProfil');
            if (!btn) return;
            if (membre) {
                btn.style.display = 'inline-block';
                btn.textContent = `👤 Profil de ${membre.pseudo}`;
            } else {
                btn.style.display = 'none';
            }
        }

            function redirigerProfil() {
                const membre = getLastMember();
                if (!membre) return;
                // S’il est assassin, on l’envoie sur missions.html, sinon sur donneur.html
                if (membre.role === 'assassin') {
                    window.location.href = `moi.html?pseudo=${encodeURIComponent(membre.pseudo)}`;
                } else {
                    window.location.href = `donneur.html?pseudo=${encodeURIComponent(membre.pseudo)}`;
                }
            }


        function afficherQuetes() {
            const liste = document.getElementById('listeQuetes');
            liste.innerHTML = '';
            let actives = 0, terminees = 0;
            quetes.forEach((q, i) => {
                const div = document.createElement('div');
                div.className = 'quête';
                div.innerHTML = `
                    <span class="${q.termine ? 'cible-terminee' : ''}">${q.cible}</span>
                    <span class="prime">${q.prime} or</span>
                    <div>
                        <input type="checkbox" ${q.termine ? 'checked' : ''} onchange="terminerQuete(${i})">
                        <button onclick="supprimerQuete(${i})">❌</button>
                    </div>
                `;
                liste.appendChild(div);
                if (q.termine) terminees++; else actives++;
            });
            document.getElementById('statsActives').textContent = `Quêtes: ${actives}`;
            document.getElementById('statsTerminees').textContent = `Terminées: ${terminees}`;
            document.getElementById('totalPrimes').textContent = `Or: ${totalOr}`;
        }

        function terminerQuete(i) {
            if (quetes[i].termine) totalOr += quetes[i].prime;
            quetes[i].termine = !quetes[i].termine;
            sauvegarder();
            afficherQuetes();
        }

        function supprimerQuete(i) {
            quetes.splice(i, 1);
            sauvegarder();
            afficherQuetes();
        }

        function detailPrime(id) {
            const details = ['Baron Noir: repéré au port', 'Seigneur: château fortifié', 'Traître: en fuite'];
            alert(`Détails Prime ${id}: ${details[id-1]}\nPrime exceptionnelle !`);
        }

        function sauvegarder() {
            localStorage.setItem('quetesAssassins', JSON.stringify(quetes));
            localStorage.setItem('totalOr', totalOr);
        }

        afficherQuetes();

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

function accepterPrime(id) {
    alert(`Mission acceptée ! Prime ${id} en cours...`);
    fermerModal();
}

function profilCible(id) {
    alert(`Profil cible ${id} chargé...`);
    fermerModal();
}

