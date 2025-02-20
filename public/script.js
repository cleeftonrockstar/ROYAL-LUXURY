const produits = [
    {
      nom: "Montre Luxe 1",
      prix: "250€",
      description: "Montre élégante avec bracelet en cuir.",
      image: "images/montre1.jpg"
    },
    {
      nom: "Montre Luxe 2",
      prix: "350€",
      description: "Montre sophistiquée avec bracelet en acier inoxydable.",
      image: "images/montre2.jpg"
    },
    {
      nom: "Montre Luxe 3",
      prix: "450€",
      description: "Montre de luxe avec cadran en diamant.",
      image: "images/montre3.jpg"
    }
  ];
  
  const produitsContainer = document.getElementById('produits');
  
  produits.forEach(produit => {
    const produitCard = document.createElement('div');
    produitCard.className = 'produit-card';
    produitCard.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}">
      <h3>${produit.nom}</h3>
      <p>${produit.prix}</p>
      <button onclick="afficherDetailsProduit(${JSON.stringify(produit)})">Voir détails</button>
      <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prix}')">Ajouter au panier</button>
       <button onclick="ajouterAWishlist('${produit.nom}', '${produit.prix}', '${produit.image}')">Ajouter à la wishlist</button>
    `;
    produitsContainer.appendChild(produitCard);
  });
  
  const panier = [];
  
  function ajouterAuPanier(nom, prix) {
    const produit = { nom, prix };
    panier.push(produit);
    console.log("Produit ajouté au panier:", produit);
    mettreAJourPanier();
  }
  
  function afficherDetailsProduit(produit) {
    const detailsProduit = `
      <h2>${produit.nom}</h2>
      <img src="${produit.image}" alt="${produit.nom}">
      <p>${produit.description}</p>
      <p>Prix : ${produit.prix}</p>
      <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prix}')">Ajouter au panier</button>
      <button onclick="revenirAccueil()">Retour à la liste des produits</button>
    `;
    const produitsContainer = document.getElementById('produits');
    produitsContainer.innerHTML = detailsProduit;
  }
  
  function revenirAccueil() {
    window.location.reload();
  }
  
  function afficherPanier() {
    const panierContainer = document.getElementById('panier');
    panierContainer.style.display = 'block';
    
    const produitsContainer = document.getElementById('produits');
    produitsContainer.style.display = 'none';
    
    mettreAJourPanier();
  }
  
  function mettreAJourPanier() {
    const contenuPanier = document.getElementById('contenu-panier');
    contenuPanier.innerHTML = ''; // Vider le contenu précédent
    
    let total = 0;
    
    panier.forEach((produit, index) => {
      total += parseFloat(produit.prix.replace('€', ''));
      const produitDiv = document.createElement('div');
      produitDiv.className = 'produit-panier';
      produitDiv.innerHTML = `
        <h4>${produit.nom}</h4>
        <p>${produit.prix}</p>
        <button onclick="supprimerDuPanier(${index})">Supprimer</button>
      `;
      contenuPanier.appendChild(produitDiv);
    });
    
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-panier';
    totalDiv.innerHTML = `<h3>Total : ${total.toFixed(2)}€</h3>`;
    contenuPanier.appendChild(totalDiv);
  }
  
  function supprimerDuPanier(index) {
    panier.splice(index, 1);
    mettreAJourPanier();
  }
  
  function procederAuPaiement() {
    document.getElementById('panier').style.display = 'none';
    document.getElementById('paiement').style.display = 'block';
  }
  
  function soumettrePaiement(event) {
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const adresse = document.getElementById('adresse').value;
    
    console.log("Paiement soumis :", { nom, email, adresse });
    alert("Merci pour votre achat, " + nom + "!");
    window.location.reload();
  }
  
  const avis = [];

function afficherDetailsProduit(produit) {
  const detailsProduit = `
    <h2>${produit.nom}</h2>
    <img src="${produit.image}" alt="${produit.nom}">
    <p>${produit.description}</p>
    <p>Prix : ${produit.prix}</p>
    <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prix}')">Ajouter au panier</button>
    <button onclick="revenirAccueil()">Retour à la liste des produits</button>
    <div id="avis">
      <h3>Avis des clients</h3>
      <div id="liste-avis"></div>
      <h4>Laisser un avis</h4>
      <form id="form-avis" onsubmit="soumettreAvis(event, '${produit.nom}')">
        <label for="nom-avis">Nom :</label>
        <input type="text" id="nom-avis" required>
        <label for="commentaire">Commentaire :</label>
        <textarea id="commentaire" required></textarea>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  `;
  const produitsContainer = document.getElementById('produits');
  produitsContainer.innerHTML = detailsProduit;

  afficherAvis(produit.nom);
}

function afficherAvis(nomProduit) {
  const listeAvis = document.getElementById('liste-avis');
  listeAvis.innerHTML = '';
  const avisFiltres = avis.filter(a => a.nomProduit === nomProduit);
  
  avisFiltres.forEach(a => {
    const avisDiv = document.createElement('div');
    avisDiv.className = 'avis';
    avisDiv.innerHTML = `
      <h4>${a.nom}</h4>
      <p>${a.commentaire}</p>
    `;
    listeAvis.appendChild(avisDiv);
  });
}

function soumettreAvis(event, nomProduit) {
  event.preventDefault();
  const nom = document.getElementById('nom-avis').value;
  const commentaire = document.getElementById('commentaire').value;
  
  avis.push({ nom, commentaire, nomProduit });
  afficherAvis(nomProduit);
  document.getElementById('form-avis').reset();
}

function rechercherProduit() {
    const recherche = document.getElementById('search-bar').value.toLowerCase();
    const produitsFiltres = produits.filter(produit =>
      produit.nom.toLowerCase().includes(recherche) ||
      produit.description.toLowerCase().includes(recherche)
    );
    
    produitsContainer.innerHTML = '';
    produitsFiltres.forEach(produit => {
      const produitCard = document.createElement('div');
      produitCard.className = 'produit-card';
      produitCard.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}">
        <h3>${produit.nom}</h3>
        <p>${produit.prix}</p>
        <button onclick="afficherDetailsProduit(${JSON.stringify(produit)})">Voir détails</button>
        <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prix}')">Ajouter au panier</button>
      `;
      produitsContainer.appendChild(produitCard);
    });
  }
  
  function filtrerProduitsParPrix() {
    const filtre = document.getElementById('filtre-prix').value;
    
    let produitsFiltres = produits;
    if (filtre !== 'all') {
      const [min, max] = filtre.split('-');
      produitsFiltres = produits.filter(produit => {
        const prix = parseFloat(produit.prix.replace('€', ''));
        return (max ? prix >= min && prix <= max : prix >= min);
      });
    }
    
    produitsContainer.innerHTML = '';
    produitsFiltres.forEach(produit => {
      const produitCard = document.createElement('div');
      produitCard.className = 'produit-card';
      produitCard.innerHTML = `
        <img src="${produit.image}" alt="${produit.nom}">
        <h3>${produit.nom}</h3>
        <p>${produit.prix}</p>
        <button onclick="afficherDetailsProduit(${JSON.stringify(produit)})">Voir détails</button>
        <button onclick="ajouterAuPanier('${produit.nom}', '${produit.prix}')">Ajouter au panier</button>
      `;
      produitsContainer.appendChild(produitCard);
    });
  }
  
  function afficherContact() {
    document.getElementById('produits').style.display = 'none';
    document.getElementById('panier').style.display = 'none';
    document.getElementById('paiement').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
  }
  
  function soumettreContact(event) {
    event.preventDefault();
    const nom = document.getElementById('nom-contact').value;
    const email = document.getElementById('email-contact').value;
    const message = document.getElementById('message-contact').value;
    
    console.log("Message de contact soumis :", { nom, email, message });
    alert("Merci pour votre message, " + nom + "!");
    document.getElementById('form-contact').reset();
    afficherAccueil();
  }
  
  function afficherAccueil() {
    window.location.reload();
  }
  
  const wishlist = [];

function ajouterAWishlist(nom, prix, image) {
  const produit = { nom, prix, image };
  wishlist.push(produit);
  console.log("Produit ajouté à la wishlist:", produit);
  mettreAJourWishlist();
}

function afficherWishlist() {
  document.getElementById('wishlist').style.display = 'block';
  document.getElementById('produits').style.display = 'none';
  document.getElementById('panier').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
  document.getElementById('paiement').style.display = 'none';
  mettreAJourWishlist();
}

function mettreAJourWishlist() {
  const contenuWishlist = document.getElementById('contenu-wishlist');
  contenuWishlist.innerHTML = ''; // Vider le contenu précédent

  wishlist.forEach((produit, index) => {
    const produitDiv = document.createElement('div');
    produitDiv.className = 'produit-wishlist';
    produitDiv.innerHTML = `
      <img src="${produit.image}" alt="${produit.nom}">
      <h4>${produit.nom}</h4>
      <p>${produit.prix}</p>
      <button onclick="supprimerDeWishlist(${index})">Supprimer</button>
    `;
    contenuWishlist.appendChild(produitDiv);
  });
}

function supprimerDeWishlist(index) {
  wishlist.splice(index, 1);
  mettreAJourWishlist();
}
