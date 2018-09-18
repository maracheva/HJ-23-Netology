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
    this.layout.forEach(item => {
        
      this.layout[item].addEventListener('dragover', (event) => {
        event.preventDefault();
        addClass('layout__item_active', event.currentTarget);
      })

      this.layout[item].addEventListener('dragleave', (event) => {
        removeClass('layout__item_active', event.currentTarget);
      })

      this.layout[item].addEventListener('drop', (event) => {
        event.preventDefault();
        event.stopPropagation();

        // проверка типа файлов
        if (!/^image\//.test(event.dataTransfer.files[0].type)) {
          removeClass('layout__item_active', event.currentTarget);
          return;
        }

        removeClass('layout__item_active', event.currentTarget);
        const img = document.createElement('img');
        img.src = URL.createObjectURL(event.dataTransfer.files[0]);
        addClass('layout__image', img);
        img.addEventListener('load', event => {
          URL.revokeObjectURL(event.currentTarget.src);
        });
        event.currentTarget.appendChild(img);
      })
    });

    this.actionButton.addEventListener('click', (event) => {
      let images = 0;
      for (let item in this.layout) {
        if (this.layout[item].firstChild && hasClass('layout__image', this.layout[item].firstChild)) {
          images++;
        }
      }

      if (images === 3) {
        event.preventDefault();
        event.stopPropagation();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = this.layout.left.offsetWidth + this.layout.top.offsetWidth;
        canvas.height = this.layout.left.offsetHeight;

        ctx.drawImage(this.layout.left.firstChild, 0, 0, this.layout.left.offsetWidth, this.layout.left.offsetHeight, 0, 0, this.layout.left.offsetWidth, this.layout.left.offsetHeight);
        ctx.drawImage(this.layout.top.firstChild, 0, 0, this.layout.top.offsetWidth, this.layout.top.offsetHeight, this.layout.left.offsetWidth, 0, this.layout.top.offsetWidth, this.layout.top.offsetHeight);
        ctx.drawImage(this.layout.bottom.firstChild, 0, 0, this.layout.bottom.offsetWidth, this.layout.bottom.offsetHeight, this.layout.left.offsetWidth, this.layout.top.offsetHeight, this.layout.bottom.offsetWidth, this.layout.bottom.offsetHeight);

        this.result.value = canvas.toDataURL();
      }
    })
  }
}

new iLayout( document.getElementById( 'layout' ));
