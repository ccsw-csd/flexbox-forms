import { Level } from "./Level";

let code = '<pre><code>&lt;input label="Name"/><br/>&lt;input label="Email"/><br/>&lt;select label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><br/>&lt;radio label="Gender" options="Woman,Man"/><br/>&lt;textarea label="Comments"/><br/>&lt;button type="primary" label="Save"/><br/>&lt;button type="secondary" label="Close"/></code></pre>';

export const LEVELS : Level[] = [{ 
    id: 1,
    description: `<p>Bienvenido a Flexbox Forms, un juego donde aprenderemos a utilizar flexbox CSS para construir pantallas con cierta disposición y diseño. Si no sabes de que va el asunto puedes visitar <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank">esta web</a>. A lo largo de los niveles de este juego iremos construyendo, poco a poco, un formulario aplicando propiedades CSS. Como ayuda tendremos un diseño en background del formulario que se espera en cada nivel.</p>
    <p>Lo primero que debes saber de flexbox es que existen dos tipos de elementos: los <b>contenedores</b> y los <b>items</b>. Por tanto existen propiedades para contenedores y otras para items, en este juego veremos las más utilizadas. Mucho cuidado porque un elemento muchas veces actua como item y como contenedor a la vez.</p>
    <p>Quizá la propiedad más importante de todas es la que sirve para activar flexbox, esta es una propiedad que asigna a un contenedor y es la de <b><i>display: flex;</i></b>. Todos los elementos que cuelguen de este contenedor actuarán como flexbox. Además, esta propiedad siempre va acompañada de otra que le indica al contenedor cual será su eje principal de disposición (row o column), esto definirá como estarán dispuestos items (en filas o en columnas). Esta propiedad es la de <b><i>flex-direction</i></b>.</p>
    <p>En este primer nivel deberás crear un formulario con dos input (nombre y email), que estén dispuestos en modo columna. Para ello tendrás que crear un contenedor que ocupe todo el ancho de la ventana y que contenga los dos items y además utilizar las propiedades de display: flex y flex-direction. A continuación exponemos el código que debes utilizar para crear los items:</p>
    <pre><code>&lt;input label="Name"/><br/>&lt;input label="Email"/></code></pre>`, 
    templateCode: '<div class="column"><input label="Name"/><input label="Email"/></div>', 
    templateStyle: '.column { width: 100%; display: flex; flex-direction: column; }', 
    checkTags: ['Name', 'Email'] 
}, { 
    id: 2,
    description: `<p>Ahora vamos a añadir más elementos a nuestro formulario y una barra de botones en la parte inferior. Por un lado añadiremos un selector de provincia, un radio selector de género y un textarea para comentarios. Y por otra parte crearemos dos botones para guardar y cerrar.</p>
    <p>Para el ello el código que vamos a utilizar en este nivel será el siguiente:</p>
    `+code+`
    <p>Recuerda que de momento deben seguir conservando su disposición en columna, aunque en este caso vamos a cambiar la anchura del textarea que deberá ser de 400px y la anchura de los botones que deberán ser de 150px cada uno.</p>
    <p>Las anchuras son propiedades que irán situadas en los <b><i>item</b></i>.</p>`,
    templateCode: '<div class="column"><input label="Name"/><input label="Email"/><select label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><radio label="Gender" options="Woman,Man"/><textarea class="textarea" label="Comments"/><button class="button" type="primary" label="Save"/><button class="button" type="secondary" label="Close"/></div>', 
    templateStyle: '.column { width: 100%; display: flex; flex-direction: column; } .button { width: 150px; } .textarea { width: 400px; }', 
    checkTags: ['Name', 'Email', 'Location', 'Gender', 'Comments', 'Save', 'Close']
}, { 
    id: 3,
    description: `<p>A menudo, cuando vamos construyendo pantallas, no queremos que todos los elementos estén siempre en modo columna, sino que buscamos distribuirlos entre filas y columnas. Esto se hace creando contenedores dentro de contenedores. Un contenedor padre de tipo columna que tenga contenedores de tipo fila.</p>
    <p>Lo que ahora necesitamos es distribuir los elementos de la siguiente forma: 
    <ul><li>en la primera fila deberá aparecer el nombre y el email</li>
    <li>en la segunda fila deberá aparecer la localización y el género</li>
    <li>en una tercera fila dejaremos el textarea</li>
    <li>por último en una cuarta fila situaremos los botones</li></ul></p>
    <p>Los elementos se deben repartir el espacio disponible de forma equitativa, el textarea al ir solo en su fila seguirá teniendo 400px de anchura, mientras que los botones deben mantener su anchura de 150px cada uno.</p>
    <p>Dejamos aquí el código que estamos usando de momento:</p>
    `+code+`
    `,
    templateCode: '<div class="column"><div class="row"><input class="flex-1" label="Name"/><input class="flex-1" label="Email"/></div><div class="row"><select class="flex-1" label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><radio class="flex-1" label="Gender" options="Woman,Man"/></div><div class="row"><textarea class="textarea" label="Comments"/></div><div class="row"><button class="button" type="primary" label="Save"/><button class="button" type="secondary" label="Close"/></div></div>', 
    templateStyle: '.column { width: 100%; display: flex; flex-direction: column; } .row { flex: 1; display: flex; flex-direction: row; } .flex-1 { flex: 1} .button { width: 150px; } .textarea { width: 400px; } ', 
    checkTags: ['Name', 'Email', 'Location', 'Gender', 'Comments', 'Save', 'Close']
}, { 
    id: 4,
    description: `<p>Ahora que ya dominamos las propiedades <b><i>display</i></b> y <b><i>flex-direction</i></b> (propiedades de contenedor), vamos a ver la siguiente propiedad importante. Es la que nos permite alinear los items de un contenedor a lo largo de su eje principal de disposición (flex-direction) siempre que no ocupen el 100% del contenedor.</p>
    <p>Dentro del contenedor se puede activar la propiedad <b><i>justify-content</i></b> donde podremos indicar la disposición de TODOS los items contenidos los posibles valores son: flex-start | flex-end | center | space-between | space-around | space-evenly.</p>
    <p>Lo que vamos a hacer ahora es alinear los items que tenemos en la tercera y cuarta fila. Lo primero será es centrar el textarea en su fila y luego alinearemos los botones a la derecha. El resto de elementos, al ocupar el 100% de anchura, permanecerán igual que en los niveles anteriores.</p>
    <p>Dejamos aquí el código que estamos usando de momento:</p>
    `+code+`
    `,
    templateCode: '<div class="column"><div class="row"><input class="flex-1" label="Name"/><input class="flex-1" label="Email"/></div><div class="row"><select class="flex-1" label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><radio class="flex-1" label="Gender" options="Woman,Man"/></div><div class="row align-center"><textarea class="textarea" label="Comments"/></div><div class="row align-right"><button class="button" type="primary" label="Save"/><button class="button" type="secondary" label="Close"/></div></div>', 
    templateStyle: '.column { width: 100%; display: flex; flex-direction: column; } .row { flex: 1; display: flex; flex-direction: row; } .flex-1 { flex: 1} .button { width: 150px; } .textarea { width: 400px; } .align-right { justify-content: flex-end; } .align-center { justify-content: center; }', 
    checkTags: ['Name', 'Email', 'Location', 'Gender', 'Comments', 'Save', 'Close']
}, { 
    id: 5,
    description: `<p>Ya hemos visto algunas de las propiedades más importantes del contenedor, pero los items también tienen algunas propiedades interesantes.</p>
    <p>La  más utilizada dentro de los items es la propiedad <b><i>flex</i></b> que en realidad es la suma de tres propiedades "flex-grow", "flex-shrink" y "flex-basis". Con esta propiedad podemos darle un peso (en espacio) a cada uno de los items dentro de un contenedor. Básicamente nos permite dimensionar los elementos hijos dentro de un contenedor padre.</p>
    <p>Para que se entienda mejor vamos a poner un ejemplo. Tenemos un contenedor tipo <b><i>display: flex</i></b> con <b><i>flex-direction: row</i></b> que tiene tres items. Estos items tienen la propiedad <b><i>flex: 1</i></b>, salvo el último que tiene <b><i>flex: 3</i></b>. Para calcular lo que ocupará cada item, lo que se hace es sumar todos los <i>flex</i> de todos los items, en este caso suman 5, y ese total se reparte proporcionalmente a su valor de <i>flex</i> entre cada item. Es decir, el primer item ocupará 1/5, el segundo item ocupará 1/5 y el último item ocupará 3/5.</p>
    <p>Para ponerlo en práctica vamos a hacer unos cambios en el formulario. Queremos que el "Email" ocupe el doble de tamaño del "Name" y que el radio button "Gender" ocupe el triple que el select "Location".</p>
    <p>Dejamos aquí el código que estamos usando de momento:</p>
    `+code+`
    `,
    templateCode: '<div class="column"><div class="row"><input class="flex-1" label="Name"/><input class="flex-2" label="Email"/></div><div class="row"><select class="flex-1" label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><radio class="flex-3" label="Gender" options="Woman,Man"/></div><div class="row align-center"><textarea class="textarea" label="Comments"/></div><div class="row align-right"><button class="button" type="primary" label="Save"/><button class="button" type="secondary" label="Close"/></div></div>', 
    templateStyle: '.column { width: 100%; display: flex; flex-direction: column; } .row { flex: 1; display: flex; flex-direction: row; } .flex-1 { flex: 1} .flex-2 { flex: 2} .flex-3 { flex: 3} .button { width: 150px; } .textarea { width: 400px; } .align-right { justify-content: flex-end; } .align-center { justify-content: center; }', 
    checkTags: ['Name', 'Email', 'Location', 'Gender', 'Comments', 'Save', 'Close']
},{ 
    id: 6,
    description: `<p>La última de las propiedades que veremos, aunque hay muchas otras interesante, es la que nos permite "darle aire" a las pantallas. Para el cerebro es muy importante que los elementos dispuestos en pantalla estén bien alineados, sean todos homogéneos en cuando a tamaños y además no estén amontonados unos con otros. Para esto existe una propiedad muy interesante que se llama <b><i>gap</i></b>.</p>
    <p>El <b><i>gap</i></b> es una medida de tipo dimensión como puede ser width, margin o padding, con lo cual se mide en "px" o en "em", y siempre se aplica a lo largo de su eje principal de disposición (flex-direction).</p>
    <p>Lo que intentaremos hacer, utilizando la propiedad <b><i>gap</i></b>, será:<ul>
    <li>Dar un espacio de 20px entre las diferentes filas</li>
    <li>Dar un espacio de 10px entre los elementos dentro de una misma fila</li>
    <li>Dar un espacio de 15px entre los dos botones</li></ul></p>
    <p>Dejamos aquí el código que estamos usando de momento:</p>
    `+code+`
    `,
    templateCode: '<div class="column"><div class="row"><input class="flex-1" label="Name"/><input class="flex-2" label="Email"/></div><div class="row"><select class="flex-1" label="Location" options="Asturias,Barcelona,Madrid,Murcia,Valencia"/><radio class="flex-3" label="Gender" options="Woman,Man"/></div><div class="row align-center"><textarea class="textarea" label="Comments"/></div><div class="row align-right button-bar"><button class="button" type="primary" label="Save"/><button class="button" type="secondary" label="Close"/></div></div>', 
    templateStyle: '.column { gap: 20px; width: 100%; display: flex; flex-direction: column; } .row { gap: 10px; flex: 1; display: flex; flex-direction: row; } .flex-1 { flex: 1} .flex-2 { flex: 2} .flex-3 { flex: 3} .button { width: 150px; } .textarea { width: 400px; } .align-right { justify-content: flex-end; } .align-center { justify-content: center; } .button-bar { gap: 15px; }', 
    checkTags: ['Name', 'Email', 'Location', 'Gender', 'Comments', 'Save', 'Close']
}, { 
    id: 7,    
    description: `<p>Ahora que ya dominas las propiedades de Flexbox, vamos a intentar crear el formulario que te propongo.</p>
    <p>En la primera fila, el componente Email es el doble que el componente Username. En la segunda fila se reparten el espacio por igual. En la tercera fila, hay dos componentes pero tres huecos repartidos, tendrás que ingeniartelas para dejar un hueco. En la cuarta fila, el componente Comentario ocupa el doble que el componente Button, además este último está centrado en el eje secundario. Y por último, los botones a la derecha.</p>
    <p>Además recuerda dar un espacio de 20px entre las diferentes filas, un espacio de 10px entre los elementos de la fila y un espacio de 15px entre los dos botones. Te dejo la lista de componentes:</p>
    <pre><code>&lt;input label="Username"/><br/>&lt;input label="Email"/><br/>&lt;input label="Nombre"/><br/>&lt;input label="Apellido 1"/><br/>&lt;input label="Apellido 2"/><br/>&lt;select label="Rol" options="User,Gestor,Admin"/><br/>&lt;select label="Estado" options="Activo,Inactivo"/><br/>&lt;textarea label="Comentario"/><br/>&lt;button type="secondary" label="Limpiar comentario"/><br/>&lt;button type="primary" label="Guardar"/><br/>&lt;button type="secondary" label="Cerrar"/></code></pre>
    `,
    templateCode: `<div class="column">
        <div class="row">
            <input class="flex-1" label="Username"/>
            <input class="flex-2" label="Email"/>
        </div>
        <div class="row">
            <input class="flex-1" label="Nombre"/>
            <input class="flex-1" label="Apellido 1"/>
            <input class="flex-1" label="Apellido 2"/>
        </div>
        <div class="row">
            <select class="flex-1" label="Rol" options="User,Gestor,Admin"/>
            <select class="flex-1" label="Estado" options="Activo,Inactivo"/>
            <div class="flex-1"/>
        </div>
        <div class="row align-items-center">
            <textarea class="flex-2" label="Comentario"/>
            <button class="flex-1" type="secondary" label="Limpiar comentario"/>
        </div>
        <div class="row align-right button-bar">
            <button class="button" type="primary" label="Guardar"/>
            <button class="button" type="secondary" label="Cerrar"/>
        </div>
    </div>`, 
    templateStyle: `
    .column { 
        gap: 20px; 
        width: 100%; 
        display: flex; 
        flex-direction: column; 
    } 
    .row { 
        gap: 10px; 
        flex: 1; 
        display: flex; 
        flex-direction: row; 
    } 
    .flex-1 { 
        flex: 1
    } 
    .flex-2 { 
        flex: 2
    } 
    .flex-3 { 
        flex: 3
    } 
    .button { 
        width: 150px; 
    } 
    .textarea { 
        width: 400px; 
    } 
    .align-right { 
        justify-content: flex-end; 
    } 
    .align-center { 
        justify-content: center; 
    } 
    .button-bar { 
        gap: 15px; 
    }
    .align-items-center {
        align-items: center;
    }
    `, 
    checkTags: ['Username', 'Email', 'Nombre', 'Apellido 1', 'Apellido 2', 'Rol', 'Estado', 'Comentario', 'Limpiar comentario', 'Guardar', 'Cerrar']
}];


