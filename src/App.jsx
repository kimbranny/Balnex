
import { useState } from "react";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("create");
  const [menuOpen, setMenuOpen] = useState(false);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [supply, setSupply] = useState("1000000000");
  const [decimals, setDecimals] = useState("9");
  const [mintAuthority, setMintAuthority] = useState("revoke");
  const [freezeAuthority, setFreezeAuthority] = useState("revoke");

  const [image, setImage] = useState(null);
  const [tokenCreated, setTokenCreated] = useState(false);
  const [tokenAmount, setTokenAmount] = useState("");
  const [solAmount, setSolAmount] = useState("");

  const [faqOpen, setFaqOpen] = useState(null);

  const navigation = [
    { id: "create", label: "Create Token", icon: "＋" },
    { id: "how", label: "How to Use", icon: "▤" },
    { id: "faq", label: "FAQ", icon: "?" },
    { id: "liquidity", label: "Manage Liquidity", icon: "◈" }
  ];

  function navigate(destination) {
    setPage(destination);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      alert("Please upload a PNG, JPG or WEBP image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function createToken(event) {
    event.preventDefault();

    if (!name.trim() || !symbol.trim() || !supply || Number(supply) <= 0) {
      alert("Please complete all required fields.");
      return;
    }

    if (Number(supply) > Number.MAX_SAFE_INTEGER) {
      alert("Supply is too large for this prototype.");
      return;
    }

    setTokenCreated(true);
    navigate("liquidity");
  }

  function resetForm() {
    setName("");
    setSymbol("");
    setDescription("");
    setSupply("1000000000");
    setDecimals("9");
    setMintAuthority("revoke");
    setFreezeAuthority("revoke");
    setImage(null);
    setTokenCreated(false);
    setTokenAmount("");
    setSolAmount("");
    navigate("create");
  }

  const faqs = [
    {
      question: "What is BALNEX?",
      answer: "BALNEX is a Solana token creation and liquidity management platform currently under development."
    },
    {
      question: "Which blockchain does BALNEX support?",
      answer: "Our first supported blockchain is Solana."
    },
    {
      question: "Do I need a wallet?",
      answer: "Yes. A compatible Solana wallet such as Phantom will be required to approve blockchain transactions."
    },
    {
      question: "What is token supply?",
      answer: "Token supply is the number of tokens initially created for your project."
    },
    {
      question: "What are mint and freeze authorities?",
      answer: "Mint authority controls whether additional tokens can be created. Freeze authority controls whether token accounts can be frozen."
    },
    {
      question: "What is Raydium liquidity?",
      answer: "Liquidity allows people to swap your token against another asset, such as SOL, through a supported Raydium pool."
    },
    {
      question: "Does BALNEX create real tokens yet?",
      answer: "Not yet. This version is a frontend prototype. Real token creation and Raydium transactions will be integrated and tested separately."
    }
  ];

  return (
    <div className="app">

      {/* HEADER */}

      <header className="navbar">
        <div className="nav-left">

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <div className="brand" onClick={() => navigate("create")}>
            <span className="brand-icon">B</span>
            BALNEX<span className="brand-dot">.</span>
          </div>

        </div>

        <button
          className="wallet"
          onClick={() => alert("Phantom wallet integration is coming in the next development stage.")}
        >
          <span>◉</span> Connect Wallet
        </button>
      </header>

      {/* DROPDOWN NAVIGATION */}

      {menuOpen && (
        <>
          <div
            className="menu-backdrop"
            onClick={() => setMenuOpen(false)}
          />

          <nav className="nav-links">
            <div className="menu-heading">NAVIGATION</div>

            {navigation.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "nav-item selected" : "nav-item"}
                onClick={() => navigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                <span className="nav-arrow">›</span>
              </button>
            ))}

            <div className="menu-footer">
              BALNEX · SOLANA ECOSYSTEM
            </div>
          </nav>
        </>
      )}

      {/* MAIN CONTENT */}

      <main className="main">

        {/* INTRO */}

        <section className="intro">
          <div className="status">
            <span className="status-dot" />
            SOLANA TOKEN LAUNCHPAD
          </div>

          <h1>
            Launch Your Own
            <span> Token.</span>
          </h1>

          <p>
            Create tokens on Solana.
            Simple, fast and transparent.
          </p>
        </section>

        {/* CREATE TOKEN */}

        {page === "create" && (
          <section className="panel">

            <div className="panel-top">
              <div>
                <span className="eyebrow">TOKEN CREATOR</span>
                <h2>Create Your Token</h2>
                <p className="muted">
                  Configure your token details below.
                </p>
              </div>

              <div className="panel-icon">✦</div>
            </div>

            <div className="steps">
              <div className="step active">
                <span>01</span>
                <small>Details</small>
              </div>
              <div className="step-line" />
              <div className="step">
                <span>02</span>
                <small>Review</small>
              </div>
              <div className="step-line" />
              <div className="step">
                <span>03</span>
                <small>Launch</small>
              </div>
            </div>

            <form onSubmit={createToken}>

              <div className="section-heading">
                <span>01</span>
                Token Information
              </div>

              <div className="field">
                <label htmlFor="token-name">Token Name *</label>
                <input
                  id="token-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My Project Token"
                  maxLength={32}
                  required
                />
                <small className="helper">Maximum 32 characters.</small>
              </div>

              <div className="field">
                <label htmlFor="token-symbol">Token Symbol *</label>
                <input
                  id="token-symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g. TOKEN"
                  maxLength={10}
                  required
                />
                <small className="helper">Maximum 10 characters.</small>
              </div>

              <div className="field">
                <label htmlFor="token-description">Description</label>
                <textarea
                  id="token-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about your project..."
                  rows={4}
                  maxLength={500}
                />
                <small className="helper">
                  {description.length}/500 characters
                </small>
              </div>

              <div className="section-heading">
                <span>02</span>
                Token Artwork
              </div>

              <div className="field">
                <label>Token Logo</label>

                <label className="upload">
                  {image ? (
                    <>
                      <img src={image} alt="Token logo preview" />
                      <strong>Change image</strong>
                    </>
                  ) : (
                    <>
                      <span className="upload-icon">↑</span>
                      <strong>Upload your token logo</strong>
                      <small>PNG, JPG or WEBP · Maximum 2MB</small>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImage}
                    hidden
                  />
                </label>
              </div>

              <div className="section-heading">
                <span>03</span>
                Token Configuration
              </div>

              <div className="two-fields">
                <div className="field">
                  <label htmlFor="supply">Total Supply *</label>
                  <input
                    id="supply"
                    type="number"
                    min="1"
                    value={supply}
                    onChange={(e) => setSupply(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="decimals">Decimals</label>
                  <select
                    id="decimals"
                    value={decimals}
                    onChange={(e) => setDecimals(e.target.value)}
                  >
                    <option value="9">9</option>
                    <option value="6">6</option>
                    <option value="2">2</option>
                    <option value="0">0</option>
                  </select>
                </div>
              </div>

              <div className="section-heading">
                <span>04</span>
                Authority Settings
              </div>

              <div className="field">
                <label htmlFor="mint-authority">Mint Authority</label>
                <select
                  id="mint-authority"
                  value={mintAuthority}
                  onChange={(e) => setMintAuthority(e.target.value)}
                >
                  <option value="revoke">Revoke after creation</option>
                  <option value="retain">Keep mint authority</option>
                </select>
                <small className="helper">
                  Revoking prevents additional tokens from being minted.
                </small>
              </div>

              <div className="field">
                <label htmlFor="freeze-authority">Freeze Authority</label>
                <select
                  id="freeze-authority"
                  value={freezeAuthority}
                  onChange={(e) => setFreezeAuthority(e.target.value)}
                >
                  <option value="revoke">Revoke after creation</option>
                  <option value="retain">Keep freeze authority</option>
                </select>
                <small className="helper">
                  Revoking prevents the authority from freezing token accounts.
                </small>
              </div>

              <div className="notice">
                <span className="notice-icon">ⓘ</span>
                <div>
                  <strong>Development Preview</strong>
                  <p>
                    Your information will be used to preview the creation
                    process. No blockchain transaction is submitted yet.
                  </p>
                </div>
              </div>

              <button className="primary" type="submit">
                Continue to Liquidity <span>→</span>
              </button>

              <p className="form-footnote">
                Your wallet will be required for real token creation.
              </p>

            </form>
          </section>
        )}

        {/* MANAGE LIQUIDITY */}

        {page === "liquidity" && (
          <section className="panel">

            <div className="panel-top">
              <div>
                <span className="eyebrow">RAYDIUM INTEGRATION</span>
                <h2>Manage Liquidity</h2>
                <p className="muted">
                  Prepare your token liquidity pool.
                </p>
              </div>
              <div className="panel-icon">◈</div>
            </div>

            {tokenCreated ? (
              <div className="success-banner">
                <span>✓</span>
                <div>
                  <strong>Prototype completed</strong>
                  <p>
                    Your token details are ready for the liquidity preview.
                    No real token has been created.
                  </p>
                </div>
              </div>
            ) : (
              <div className="notice">
                <strong>No token selected</strong>
                <p>Create a token first to continue to liquidity management.</p>
                <button
                  className="text-button"
                  onClick={() => navigate("create")}
                >
                  Create a token →
                </button>
              </div>
            )}

            {tokenCreated && (
              <>
                <div className="section-heading">
                  Selected Token
                </div>

                <div className="token-preview">
                  <div className="token-avatar">
                    {image ? <img src={image} alt="" /> : "B"}
                  </div>
                  <div className="token-info">
                    <strong>{name} ({symbol})</strong>
                    <small>Supply: {Number(supply).toLocaleString()}</small>
                    <small>Decimals: {decimals}</small>
                  </div>
                  <span className="preview-tag">PREVIEW</span>
                </div>

                {description && (
                  <p className="token-description">{description}</p>
                )}
              </>
            )}

            <div className="section-heading">
              Liquidity Configuration
            </div>

            <div className="field">
              <label htmlFor="token-amount">Token Amount</label>
              <input
                id="token-amount"
                type="number"
                min="0"
                placeholder="Enter token amount"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="sol-amount">SOL Amount</label>
              <input
                id="sol-amount"
                type="number"
                min="0"
                placeholder="Enter SOL amount"
                value={solAmount}
                onChange={(e) => setSolAmount(e.target.value)}
              />
            </div>

            <div className="pool-preview">
              <div>
                <span>Pool type</span>
                <strong>Raydium CPMM</strong>
              </div>
              <div>
                <span>Token amount</span>
                <strong>{tokenAmount || "0"}</strong>
              </div>
              <div>
                <span>SOL amount</span>
                <strong>{solAmount || "0"} SOL</strong>
              </div>
            </div>

            <div className="notice">
              <span className="notice-icon">ⓘ</span>
              <div>
                <strong>Raydium is not connected yet</strong>
                <p>
                  Real pool creation requires a supported Raydium program,
                  a funded wallet, and a confirmed blockchain transaction.
                  This preview does not submit a transaction.
                </p>
              </div>
            </div>

            <button
              className="primary"
              disabled={!tokenCreated}
              onClick={() => alert("Raydium CPMM integration is coming next.")}
            >
              Continue to Raydium <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("create")}
            >
              ← Back to Token Creator
            </button>

          </section>
        )}

        {/* HOW TO USE */}

        {page === "how" && (
          <section className="panel">

            <span className="eyebrow">GETTING STARTED</span>
            <h2>How to Use BALNEX</h2>
            <p className="muted">
              Follow these steps to create and prepare your Solana token.
            </p>

            {[
              ["Connect your wallet", "Connect a compatible Solana wallet such as Phantom."],
              ["Enter token information", "Choose your token name, symbol and description."],
              ["Upload your logo", "Add an image to represent your token."],
              ["Configure your supply", "Choose your total supply and decimal precision."],
              ["Set token authorities", "Decide whether to retain or revoke mint and freeze authorities."],
              ["Create your token", "Review your information and approve the real transaction when supported."],
              ["Manage liquidity", "Proceed to Raydium to prepare your token and SOL liquidity pool."]
            ].map((item, index) => (
              <div className="guide" key={index}>
                <span className="guide-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <strong>{item[0]}</strong>
                  <p>{item[1]}</p>
                </div>
              </div>
            ))}

            <div className="notice">
              <strong>Important</strong>
              <p>
                Always review transaction details before approving them
                in your wallet. Never share your recovery phrase.
              </p>
            </div>

            <button
              className="primary"
              onClick={() => navigate("create")}
            >
              Start Creating <span>→</span>
            </button>

          </section>
        )}

        {/* FAQ */}

        {page === "faq" && (
          <section className="panel">

            <span className="eyebrow">HELP CENTRE</span>
            <h2>Frequently Asked Questions</h2>
            <p className="muted">
              Answers to common questions about BALNEX.
            </p>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div className="faq-item" key={index}>
                  <button
                    className="faq-question"
                    onClick={() =>
                      setFaqOpen(faqOpen === index ? null : index)
                    }
                    aria-expanded={faqOpen === index}
                  >
                    {faq.question}
                    <span>{faqOpen === index ? "−" : "+"}</span>
                  </button>

                  {faqOpen === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="notice">
              <strong>Need help?</strong>
              <p>
                BALNEX is currently under development. More support
                information will be added as the platform grows.
              </p>
            </div>

            <button
              className="primary"
              onClick={() => navigate("create")}
            >
              Create a Token <span>→</span>
            </button>

          </section>
        )}

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <div className="footer-brand">
          BALNEX<span>.</span>
        </div>

        <p>Built for the Solana ecosystem.</p>

        <div className="footer-links">
          <button onClick={() => navigate("create")}>Create Token</button>
          <button onClick={() => navigate("how")}>How to Use</button>
          <button onClick={() => navigate("faq")}>FAQ</button>
        </div>

        <small>© 2026 BALNEX. All rights reserved.</small>
        <small className="development-label">DEVELOPMENT PREVIEW</small>
      </footer>

    </div>
  );
}
