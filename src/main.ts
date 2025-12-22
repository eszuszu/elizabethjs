import styles from './style.css?raw';
import './style.css';

(() => {
  type theme = 'light' | 'dark';
  class App extends HTMLElement {
    themeToggle: HTMLButtonElement | null = null;
    navToggle: HTMLButtonElement | null = null;
    emailButton: HTMLButtonElement | null = null;
    navIsExpanded: boolean = false;
    currentTheme: theme  = localStorage.getItem('theme') as theme;
    template = () =>
      `
      <div class="portal"></div>
      <slot name="header"></slot>
      <slot name="page"></slot>
      <slot name="footer"></slot>
      `
    constructor(){
      super();
      this.attachShadow({ mode: 'open' });
      this.paint(styles);
      this.render();
    }
    
    connectedCallback(): void {
      console.log(this.shadowRoot?.adoptedStyleSheets);
      console.log(`users saved theme is ${this.currentTheme}`)
      if (this.currentTheme === null) {
        this.currentTheme = 'dark';
        document.documentElement.dataset.theme = 'dark';
      }
      this.themeToggle = this.querySelector('.theme-toggle');
      this.navToggle = this.querySelector('.nav-toggle');
      this.emailButton = this.querySelector('.email-btn');

      console.log(this.themeToggle);
      if (this.themeToggle !== null) {
        this.currentTheme = document.documentElement.dataset.theme as theme;
        this.themeToggle?.addEventListener('click', this.handleThemeToggle);
      }
      if (this.navToggle !== null) {
        this.navToggle?.addEventListener('click', this.handleNavToggle);
      }
      if (this.emailButton ?? null) {
        this.emailButton?.addEventListener('click', this.handleClipBoardEvent);
      }

    }

    adoptedCallback() {
      console.log('app custom element moved to new document.')
      this.paint(styles);
      this.render();
    }

    disconnectedCallback() {
      this.themeToggle?.removeEventListener('click', this.handleThemeToggle);
      this.navToggle?.removeEventListener('click', this.handleNavToggle);
      this.emailButton?.removeEventListener('click', this.handleClipBoardEvent);
      console.log('app custom element removed from dom');
    }

    render(): void {
      let tmp: HTMLTemplateElement = document.createElement('template');

      tmp.innerHTML = this.template();

      const compiled = tmp.content.cloneNode(true);

      this.shadowRoot?.append(compiled);
    }

    paint(sheet: string): void {
      let tmp = new CSSStyleSheet;
      tmp.replaceSync(sheet);

      if (this.shadowRoot) {
        this.shadowRoot.adoptedStyleSheets = [tmp];
      }
    }

    handleThemeToggle = () => {
      if (this.currentTheme === 'dark') {
        document.documentElement.dataset.theme = 'light';
        localStorage.setItem('theme', 'light')
        this.currentTheme = 'light';
      } else {
        document.documentElement.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
        this.currentTheme = 'dark';
      }
      //console.log(`${this.currentTheme}`);
    }

    handleNavToggle = () => {
      let nav = this.querySelector('nav')!;
      nav.classList.toggle('contracted');
      this.navIsExpanded ? this.navIsExpanded = true : this.navIsExpanded = false;
      
    }

    async writeToClipBoard(text: string) {
      try {
        await navigator.clipboard.writeText(text);
        //console.log(text);
      } catch (error) {
        //console.error(error)
      }
    }

    handleClipBoardEvent = () => {
      this.writeToClipBoard(import.meta.env.VITE_EMAIL);
      this.emailButton?.classList.add('copied');
      const textNode = this.emailButton?.querySelector('.micro');
      textNode!.textContent = 'copied email to clipboard';
    }

  }

  window.customElements.define("app-", App);
})();



