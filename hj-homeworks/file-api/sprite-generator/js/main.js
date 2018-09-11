const prop = ( data, name ) => data.map( item => item[ name ] ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );
class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );

    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];

    // this.imagesCount = 0;

    this.registerEvents();
  }
  get imagesCount() { // добавим геттер
    return this.images.length;
  }
  registerEvents() {
    // событие на кнопке загрузки изображений
    this.uploadButton.addEventListener('change', event => {
      //добавляем в массив
      this.images = [];
      Array.from(event.currentTarget.files).forEach(item => {
        if (/^image\//.test(item.type)) {
          let newImage = new Image();
          newImage.src = URL.createObjectURL(item);
          newImage.addEventListener('load', (e) => {
            URL.revokeObjectURL(e.currentTarget.src);
          });
          this.images.push(newImage);
          console.log(this.images);
        }
      })
      //обновляем количество загруженных картинок
      document.querySelector('.images__added-count-value').innerText = this.imagesCount;
    })

    this.submitButton.addEventListener('click', event => {

      let row = 0;
      let position = 0;

      const canvas = document.createElement('canvas');
      this.images.length >= 8 ? canvas.width = 400 : canvas.width = this.images.length * 50;
      this.images.length <= 8 ? canvas.height = 50 : canvas.height = Math.ceil(this.images.length / 8) * 50;
      const ctx = canvas.getContext('2d');
      
      let styleText = '';

      this.images.forEach((image, index) => {

        ctx.drawImage(image, position * 50, row * 50, 50, 50);

        styleText += `\n.icon_${ index } {\n  background-position: -${ position * 50 }px -${ row * 50 }px;\n  width: 50px;\n  height: 50px;\n}`

        position++;

        if (position >= 8) {
          row ++;
          position = 0;
        }
      })

      styleText = `.icon {\n  display: inline-block;\n  background-image: url(${canvas.toDataURL()});\n}` + styleText;
      this.codeContainer.innerText = styleText;
      this.imageElement.src = canvas.toDataURL();
    })
  }
}

new SpriteGenerator( document.getElementById( 'generator' ));
