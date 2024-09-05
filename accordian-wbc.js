class Accodian extends HTMLElement {
	css = `
		:host {
		}

		.accordion {
			background-color:		rgb(29, 29, 29);
			color:					rgb(220, 220, 220);
			cursor:					pointer;
			padding: 				18px;
			width: 					100%;
			border: 				none;
			text-align: 			left;
			outline: 				none;
			font-size: 				15px;
			transition: 			0.5s;
		}

		.active, .accordion:hover {
			background-color:		rgb(89, 89, 89);
		}

		.panel {
			padding: 				0 18px;
			display: 				none;
			background-color: 		white;
			overflow: 				hidden;
			background-color:		rgb(49, 49, 49);
			color:					rgb(220, 220, 220);
			margin:					0px 0px 8px 0px;
			border-radius:			0px 0px 4px 4px;
		}
	`;

	// Component Constructor
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	// Add any items we want to observe changes to
	static get observedAttributes() {
		// return ['id'];
	}

	// Attaches the event listeners to the stars
	addEventListeners() {
		// this.submit.addEventListener('click', this.submitRating.bind(this), true);
		/** @type {number} this.i */
		this.i = 0;

		for (this.i = 0; this.i < this.acc.length; this.i++) {
			this.acc[this.i].addEventListener("click", function() {
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}

	// Invoked when the custom element is first connected to the document's DOM.
	connectedCallback(evt) {
		// console.log('connectedCallback');
		this.render();
	}

	// Invoked when the custom element is disconnected from the document's DOM.
	disconnectedCallback(evt) {
		console.log('disconnectedCallback');
	}

	// Invoked when one of the custom element's attributes is added, removed, or changed.
	attributeChangedCallback(evt) {
		console.log('attributeChangedCallback');
	}

	/** @returns {string} A string that builds the ShadowDom */
	template = () => {
		this.tempStr = ``;
			/** @type {string} this.slots */
			this.slots = document.querySelectorAll('accordian-wbc > span');
			for (let index = 0; index < this.slots.length; index++) {
				if(this.slots[index].hasAttribute('slot') && this.slots[index].hasAttribute('title')) {
					this.tempStr += `<button class="accordion">${this.slots[index].title}</button><div class="panel"><p><slot name="${this.slots[index].slot}"></slot></p></div>`;
				}
			}
		return this.tempStr;
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>${this.css.trim()}</style>
			${this.template().trim()}
		`;

		this.acc = this.shadow.querySelectorAll(".accordion");

		// Attach event listeners
		this.addEventListeners();
	}
}

customElements.define('accordian-wbc', Accodian);