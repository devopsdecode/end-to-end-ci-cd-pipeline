/**
 * App.js - NFT Marketplace State & Web3 Mock Engine
 * Stores marketplace listings, wallet connections, and transactions in LocalStorage
 */

// Exchange rate constants
const ETH_USD_RATE = 3450;
const DEFAULT_WALLET_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

// Default seed data for the marketplace
const DEFAULT_NFTS = [
  {
    id: "samurai-88",
    title: "CyberPunk Samurai #88",
    description: "A legendary digital warrior forged in the neon grids of Neo-Tokyo. Features custom cybernetic visor, composite carbon armor, and an active plasma katana.",
    image: "assets/cyberpunk_samurai.png",
    price: 1.85,
    creator: "0xNeoTokyoArt",
    owner: "0xNeoTokyoArt",
    category: "art",
    status: "buy_now",
    bids: [],
    likes: 42,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xNeoTokyoArt", date: "3 days ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Neon Tokyo Grid" },
      { trait_type: "Armor", value: "Neo-Samurai Plate" },
      { trait_type: "Weapon", value: "Laser Katana" }
    ],
    royalty: 5
  },
  {
    id: "phoenix-cosmic",
    title: "Cosmic Phoenix",
    description: "An interstellar entity birthed from a dying super-giant star, soaring across the pink and violet clouds of the Orion Nebula.",
    image: "assets/cosmic_nebula.png",
    price: 3.20,
    creator: "0xGalaxyMaker",
    owner: "0xGalaxyMaker",
    category: "photography",
    status: "has_bids",
    bids: [
      { bidder: "0xSupernova", amount: 2.80, time: "2 hours ago" },
      { bidder: "0xCometRider", amount: 3.05, time: "30 mins ago" }
    ],
    likes: 128,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xGalaxyMaker", date: "5 days ago" }
    ],
    attributes: [
      { trait_type: "Species", value: "Interstellar Phoenix" },
      { trait_type: "Color", value: "Nebula Violet" },
      { trait_type: "Core", value: "Supernova Pulsar" }
    ],
    royalty: 8
  },
  {
    id: "ape-404",
    title: "Cyber Ape #404",
    description: "A highly intelligent, street-styled cybernetic ape wearing golden armor and holographic tech goggles. Master of decentralized operations.",
    image: "assets/cyber_ape.png",
    price: 2.45,
    creator: "0xStreetCyber",
    owner: "0xStreetCyber",
    category: "gaming",
    status: "buy_now",
    bids: [],
    likes: 95,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xStreetCyber", date: "1 day ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Cyber City Alley" },
      { trait_type: "Jacket", value: "Golden Tech Streetwear" },
      { trait_type: "Goggles", value: "Holo HUD Goggles" }
    ],
    royalty: 7
  },
  {
    id: "aether-core",
    title: "Aetherium Core #0047",
    description: "A floating quantum crystal pulsing with infinite network energy, housing holographic geometric runes. Rarity: Divine 1/1.",
    image: "assets/ether_crystal.png",
    price: 5.50,
    creator: "0xCrystalMage",
    owner: "0xCrystalMage",
    category: "collectibles",
    status: "buy_now",
    bids: [],
    likes: 210,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xCrystalMage", date: "6 days ago" }
    ],
    attributes: [
      { trait_type: "Rarity", value: "Divine 1/1" },
      { trait_type: "Core", value: "Holographic Crystal" },
      { trait_type: "Energy", value: "Quantum Pulse" }
    ],
    royalty: 10
  },
  {
    id: "samurai-102",
    title: "CyberPunk Samurai #102",
    description: "Edition 102 of the CyberPunk Samurai collection. Adorned with a golden helmet crest and advanced target tracking visor systems.",
    image: "assets/cyberpunk_samurai.png",
    price: 2.10,
    creator: "0xNeoTokyoArt",
    owner: "0xNeoTokyoArt",
    category: "art",
    status: "buy_now",
    bids: [],
    likes: 31,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xNeoTokyoArt", date: "2 days ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Neon Tokyo Grid" },
      { trait_type: "Armor", value: "Gold Crest Plate" },
      { trait_type: "Weapon", value: "Laser Katana" }
    ],
    royalty: 5
  },
  {
    id: "samurai-03",
    title: "CyberPunk Samurai #03",
    description: "A rare early prototype Ronin unit. Equipped with heavy armor plating designed for endurance combat in extreme environments.",
    image: "assets/cyberpunk_samurai.png",
    price: 1.50,
    creator: "0xNeoTokyoArt",
    owner: "0xNeoTokyoArt",
    category: "art",
    status: "buy_now",
    bids: [],
    likes: 18,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xNeoTokyoArt", date: "4 days ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Subway Access Tunnel" },
      { trait_type: "Armor", value: "Heavy Prototype Plate" },
      { trait_type: "Weapon", value: "None (Fists)" }
    ],
    royalty: 5
  },
  {
    id: "ape-21",
    title: "Cyber Ape #21",
    description: "A stealth operations specialist Cyber Ape. Outfitted with light carbon armor and integrated neural interface goggles.",
    image: "assets/cyber_ape.png",
    price: 1.95,
    creator: "0xStreetCyber",
    owner: "0xStreetCyber",
    category: "gaming",
    status: "buy_now",
    bids: [],
    likes: 39,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xStreetCyber", date: "4 days ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Hologram Display Panel" },
      { trait_type: "Jacket", value: "Stealth Obsidian Hoodie" },
      { trait_type: "Goggles", value: "Neural Nightvision" }
    ],
    royalty: 7
  },
  {
    id: "ape-909",
    title: "Cyber Ape #909",
    description: "The commanding officer of the Cyber Ape divisions. Wearing a custom command coat and boasting full hardware integrations.",
    image: "assets/cyber_ape.png",
    price: 3.10,
    creator: "0xStreetCyber",
    owner: "0xStreetCyber",
    category: "gaming",
    status: "has_bids",
    bids: [
      { bidder: "0xHackerGuy", amount: 2.95, time: "4 hours ago" }
    ],
    likes: 72,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xStreetCyber", date: "12 hours ago" }
    ],
    attributes: [
      { trait_type: "Background", value: "Command Center Dashboard" },
      { trait_type: "Jacket", value: "Command Overcoat Gold" },
      { trait_type: "Goggles", value: "Tactical Overlays" }
    ],
    royalty: 7
  },
  {
    id: "nebula-core",
    title: "Astral Nebula Core",
    description: "A visual simulation of interstellar particles clustering under quantum gravity, revealing the birth of an stellar system.",
    image: "assets/cosmic_nebula.png",
    price: 2.80,
    creator: "0xGalaxyMaker",
    owner: "0xGalaxyMaker",
    category: "photography",
    status: "buy_now",
    bids: [],
    likes: 54,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xGalaxyMaker", date: "6 days ago" }
    ],
    attributes: [
      { trait_type: "Species", value: "Stellar Cloud" },
      { trait_type: "Color", value: "Hyper Pink" },
      { trait_type: "Core", value: "Active Starburst" }
    ],
    royalty: 8
  },
  {
    id: "quantum-prism",
    title: "Quantum Prism #0012",
    description: "A crystalline refraction structure designed to filter tachyon beam relays. Rarity: Mythic.",
    image: "assets/ether_crystal.png",
    price: 4.20,
    creator: "0xCrystalMage",
    owner: "0xCrystalMage",
    category: "collectibles",
    status: "buy_now",
    bids: [],
    likes: 88,
    likedBy: [],
    history: [
      { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: "0xCrystalMage", date: "1 week ago" }
    ],
    attributes: [
      { trait_type: "Rarity", value: "Mythic 1/10" },
      { trait_type: "Core", value: "Refractive Prism" },
      { trait_type: "Energy", value: "Tachyon Charge" }
    ],
    royalty: 10
  }
];

// Helper methods for storage management
const Storage = {
  getNFTs() {
    if (!localStorage.getItem("nfts")) {
      localStorage.setItem("nfts", JSON.stringify(DEFAULT_NFTS));
    }
    return JSON.parse(localStorage.getItem("nfts"));
  },
  saveNFTs(nfts) {
    localStorage.setItem("nfts", JSON.stringify(nfts));
  },
  getWallet() {
    let wallet = localStorage.getItem("wallet");
    if (!wallet) {
      wallet = {
        connected: false,
        address: null,
        balanceETH: 15.0, // starts with 15 mock ETH
        balanceUSD: 15.0 * ETH_USD_RATE
      };
      localStorage.setItem("wallet", JSON.stringify(wallet));
    } else {
      wallet = JSON.parse(wallet);
      wallet.balanceUSD = wallet.balanceETH * ETH_USD_RATE; // recalculate to keep in sync
    }
    return wallet;
  },
  saveWallet(wallet) {
    wallet.balanceUSD = wallet.balanceETH * ETH_USD_RATE;
    localStorage.setItem("wallet", JSON.stringify(wallet));
  }
};

// Global App controller/API wrapper
window.Marketplace = {
  getNFTs: Storage.getNFTs,
  getWallet: Storage.getWallet,
  saveNFTs: Storage.saveNFTs,
  saveWallet: Storage.saveWallet,
  ETH_USD_RATE: ETH_USD_RATE,

  connectWallet() {
    const wallet = Storage.getWallet();
    wallet.connected = true;
    wallet.address = DEFAULT_WALLET_ADDRESS;
    Storage.saveWallet(wallet);
    this.updateHeaderUI();
    // Refresh page if needed to bind wallet listeners
    setTimeout(() => {
      window.location.reload();
    }, 300);
  },

  disconnectWallet() {
    const wallet = Storage.getWallet();
    wallet.connected = false;
    wallet.address = null;
    Storage.saveWallet(wallet);
    this.updateHeaderUI();
    setTimeout(() => {
      window.location.reload();
    }, 300);
  },

  likeNFT(id) {
    const wallet = Storage.getWallet();
    if (!wallet.connected) {
      alert("Please connect your wallet to like NFTs!");
      return false;
    }
    const nfts = Storage.getNFTs();
    const nft = nfts.find(n => n.id === id);
    if (!nft) return false;

    if (!nft.likedBy) nft.likedBy = [];

    const index = nft.likedBy.indexOf(wallet.address);
    if (index === -1) {
      // Like
      nft.likedBy.push(wallet.address);
      nft.likes = (nft.likes || 0) + 1;
    } else {
      // Unlike
      nft.likedBy.splice(index, 1);
      nft.likes = Math.max(0, (nft.likes || 1) - 1);
    }
    Storage.saveNFTs(nfts);
    return nft;
  },

  mintNFT(title, description, price, category, imageUrl, attributes, royalty) {
    const wallet = Storage.getWallet();
    if (!wallet.connected) {
      alert("Please connect your wallet to mint an NFT.");
      return null;
    }

    const nfts = Storage.getNFTs();
    const newNFT = {
      id: "nft-" + Date.now(),
      title: title,
      description: description,
      image: imageUrl || "assets/cyberpunk_samurai.png",
      price: parseFloat(price),
      creator: wallet.address,
      owner: wallet.address,
      category: category,
      status: "buy_now",
      bids: [],
      likes: 0,
      likedBy: [],
      history: [
        { event: "Minted", price: 0, from: "0x0000000000000000000000000000000000000000", to: wallet.address, date: "Just now" }
      ],
      attributes: attributes || [],
      royalty: parseInt(royalty) || 0
    };

    nfts.unshift(newNFT);
    Storage.saveNFTs(nfts);
    return newNFT;
  },

  buyNFT(id, onProgress, onSuccess, onError) {
    const wallet = Storage.getWallet();
    if (!wallet.connected) {
      onError("Please connect your wallet to buy this NFT.");
      return;
    }

    const nfts = Storage.getNFTs();
    const nft = nfts.find(n => n.id === id);
    if (!nft) {
      onError("NFT not found.");
      return;
    }

    if (nft.owner.toLowerCase() === wallet.address.toLowerCase()) {
      onError("You already own this NFT.");
      return;
    }

    if (wallet.balanceETH < nft.price) {
      onError(`Insufficient balance. You need ${nft.price} ETH, but only have ${wallet.balanceETH.toFixed(4)} ETH.`);
      return;
    }

    // Step 1: Initiate Transaction simulation
    onProgress("Initiating wallet signature request...", 10);

    setTimeout(() => {
      onProgress("Simulating smart contract execution (transferFrom)...", 40);

      setTimeout(() => {
        onProgress("Confirming block inclusion on Ethereum mainnet...", 75);

        setTimeout(() => {
          // Complete Tx
          const oldOwner = nft.owner;
          
          // Deduct from buyer
          wallet.balanceETH -= nft.price;
          Storage.saveWallet(wallet);

          // Update NFT
          nft.owner = wallet.address;
          nft.status = "buy_now"; // reset listing status if bought
          nft.history.unshift({
            event: "Sale",
            price: nft.price,
            from: oldOwner,
            to: wallet.address,
            date: "Just now"
          });

          Storage.saveNFTs(nfts);
          onSuccess(nft);
        }, 1200);
      }, 1200);
    }, 1200);
  },

  placeBid(id, amount, onProgress, onSuccess, onError) {
    const wallet = Storage.getWallet();
    if (!wallet.connected) {
      onError("Please connect your wallet to place a bid.");
      return;
    }

    const nfts = Storage.getNFTs();
    const nft = nfts.find(n => n.id === id);
    if (!nft) {
      onError("NFT not found.");
      return;
    }

    if (nft.owner.toLowerCase() === wallet.address.toLowerCase()) {
      onError("You cannot bid on your own NFT.");
      return;
    }

    const bidAmount = parseFloat(amount);
    const highestBid = nft.bids && nft.bids.length > 0 
      ? Math.max(...nft.bids.map(b => b.amount)) 
      : 0;

    const minRequiredBid = highestBid > 0 ? highestBid : nft.price;

    if (bidAmount <= minRequiredBid) {
      onError(`Bid must be higher than the current highest bid/reserve price of ${minRequiredBid} ETH.`);
      return;
    }

    if (wallet.balanceETH < bidAmount) {
      onError(`Insufficient balance to lock in this bid. You have ${wallet.balanceETH.toFixed(4)} ETH.`);
      return;
    }

    onProgress("Requesting allowance check for Wrapped Ether (WETH)...", 20);

    setTimeout(() => {
      onProgress("Submitting bid transaction to contract memory pool...", 60);

      setTimeout(() => {
        // Complete Bid
        if (!nft.bids) nft.bids = [];
        nft.bids.push({
          bidder: wallet.address,
          amount: bidAmount,
          time: "Just now"
        });
        nft.status = "has_bids";

        nft.history.unshift({
          event: "Bid",
          price: bidAmount,
          from: wallet.address,
          to: "",
          date: "Just now"
        });

        Storage.saveNFTs(nfts);
        onSuccess(nft);
      }, 1200);
    }, 1200);
  },

  formatAddress(addr) {
    if (!addr) return "";
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  },

  updateHeaderUI() {
    const wallet = Storage.getWallet();
    const walletBtn = document.getElementById("wallet-connect-btn");
    const walletDetails = document.getElementById("wallet-details");
    
    if (walletBtn && walletDetails) {
      if (wallet.connected) {
        walletBtn.style.display = "none";
        walletDetails.style.display = "flex";
        
        const addressEl = document.getElementById("wallet-address-display");
        const balanceEl = document.getElementById("wallet-balance-display");
        
        if (addressEl) addressEl.textContent = this.formatAddress(wallet.address);
        if (balanceEl) balanceEl.textContent = wallet.balanceETH.toFixed(2) + " ETH";
      } else {
        walletBtn.style.display = "block";
        walletDetails.style.display = "none";
      }
    }
  }
};

// Auto-run header binder on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.Marketplace.updateHeaderUI();

  // Bind main wallet button event listeners
  const walletBtn = document.getElementById("wallet-connect-btn");
  if (walletBtn) {
    walletBtn.addEventListener("click", () => {
      window.Marketplace.connectWallet();
    });
  }

  // Profile disconnect listener
  const disconnectBtn = document.getElementById("disconnect-wallet-btn");
  if (disconnectBtn) {
    disconnectBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.Marketplace.disconnectWallet();
    });
  }

  // Hook global search bars (header and hero) to redirect to explore.html?search=xyz
  const searchInputs = document.querySelectorAll(".global-search-input");
  searchInputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const query = e.target.value.trim();
        window.location.href = `explore.html?search=${encodeURIComponent(query)}`;
      }
    });
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});
