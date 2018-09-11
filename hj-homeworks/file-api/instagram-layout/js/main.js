const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    for (let key in this.layout) {

      this.layout[key].addEventListener('dragover', (event) => {
        event.preventDefault();
        addClass('layout__item_active', event.currentTarget);
      })

      this.layout[key].addEventListener('dragleave', (event) => {
        removeClass('layout__item_active', event.currentTarget);
      })

      this.layout[key].addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation();

        //type file checking
        if (!/^image\//.test(event.dataTransfer.files[0].type)) {
          removeClass('layout__item_active', event.currentTarget);
          return;
        }

        removeClass('layout__item_active', event.currentTarget);
        const pictureItem = document.createElement('img');
        pictureItem.src = URL.createObjectURL(event.dataTransfer.files[0]);
        addClass('layout__image', pictureItem);
        pictureItem.addEventListener('load', event => {
          URL.revokeObjectURL(event.currentTarget.src);
        });
        event.currentTarget.appendChild(pictureItem);
      })
    }

    this.actionButton.addEventListener('click', (event) => {
      let images = 0;
      for (let key in this.layout) {

        if (this.layout[key].firstChild && hasClass('layout__image', this.layout[key].firstChild)) {
          images++;
        }
      }

      if (images === 3) {
        event.preventDefault();
        event.stopPropagation();
        const canvas = document.createElement('canvas');
        canvas.width = this.layout.left.offsetWidth + this.layout.top.offsetWidth;
        canvas.height = this.layout.left.offsetHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(this.layout.left.firstChild, 0, 0, this.layout.left.offsetWidth, this.layout.left.offsetHeight, 0, 0, this.layout.left.offsetWidth, this.layout.left.offsetHeight);
        ctx.drawImage(this.layout.top.firstChild, 0, 0, this.layout.top.offsetWidth, this.layout.top.offsetHeight, this.layout.left.offsetWidth, 0, this.layout.top.offsetWidth, this.layout.top.offsetHeight);
        ctx.drawImage(this.layout.bottom.firstChild, 0, 0, this.layout.bottom.offsetWidth, this.layout.bottom.offsetHeight, this.layout.left.offsetWidth, this.layout.top.offsetHeight, this.layout.bottom.offsetWidth, this.layout.bottom.offsetHeight);

        this.result.value = canvas.toDataURL();
      }
    })
  }
}

new iLayout( document.getElementById( 'layout' ));
