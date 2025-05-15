let donateurs = [];

async function recupererDonateurs() {
  try {
    const reponse = await fetch('https://randomuser.me/api/?results=50');
    const data = await reponse.json();

    donateurs = data.results.map(d => ({
      nom: `${majuscule(d.name.first)} ${majuscule(d.name.last)}`,
      genre: d.gender,
      telephone: d.phone,
      email : d.email,
      adresse: `${d.location.city}, ${d.location.country}`,
      photo: d.picture.medium,
      montant: parseFloat((Math.random() * 500 + 10).toFixed(2))
    }));

    afficherDonateurs(donateurs);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des donateurs :", erreur);
  }
}

function afficherDonateurs(liste) {
  const conteneur = document.getElementById('donor-list');
  conteneur.innerHTML = '';

  liste.forEach(d => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${d.photo}" alt="Photo de ${d.nom}" />
      <div class="donor-info">
        <strong>${d.nom}</strong><br>
        <span><strong>Genre :</strong> ${traduireGenre(d.genre)}</span><br>
        <span><strong>📞 :</strong> ${d.telephone}</span><br>
        <span><strong>📧 :</strong> ${d.email}</span><br>
        <span><strong>🏠 :</strong> ${d.adresse}</span><br>
        <span><strong>Don 💰 :</strong> ${d.montant} €</span>
      </div>
    `;
    conteneur.appendChild(li);
  });
}

function traduireGenre(genre) {
  return genre === 'male' ? 'Homme' : 'Femme';
}

function majuscule(texte) {
  return texte.charAt(0).toUpperCase() + texte.slice(1);
}

function filterByGender(genre) {
  const filtre = donateurs.filter(d => d.genre === genre);
  afficherDonateurs(filtre);
}

function sortByAmount(ordre) {
  const trie = [...donateurs].sort((a, b) =>
    ordre === 'asc' ? a.montant - b.montant : b.montant - a.montant
  );
  afficherDonateurs(trie);
}

function sortByName() {
  const trie = [...donateurs].sort((a, b) => a.nom.localeCompare(b.nom));
  afficherDonateurs(trie);
}

function resetFilters() {
  afficherDonateurs(donateurs);
}

recupererDonateurs();

