# KubeStore - Tienda de cubos

## Requerimientos

- PHP 7.2 o superior.
- MySql 5.7.28 o superior

## Base de datos

- [Modelo entidad - relación ](diagrams/kubeStore.png)
- [Modelo entidad - relación ](uml/kubeStore_2.png)

## Configuración

Si usa docker:

1. Asegurarse que los archivos están contenidos en una carpeta.
2. Dentro de esta carpeta deberá crear una nueva con el nombre de `mysql-data`.
3. Asegurarse de dar permisos de escritura y lectura a la carpeta `kubeStore/` y `mysql-data/` puede usar `sudo chmod 777 -R directory/`
4. Situarse en la carpeta donde se encuentra `docker-compose.yml` e iniciar el contenedor con `sudo docker-compose up`
5. Una vez iniciado, crear la base de datos con nombre `kubeStore` con codificación `utf8mb4_bin` a traves de phpMyAdmin (http://localhost:9080)
6. Insertar las sentencias sql `actual_kubeStore.sql` situandose en la base de datos creada.
7. Ingresar en la página (http://localhost:8080)


Si se usa xampp
1. Solo será necesario que se introduzca la carpeta public en htdocs.
1. Deberá modificar los parametros de la conexión a la base de datos `kubeStore/public/php/database/db.php` (`$db_host='localhost'`) (`$db_username='root'`) (`$db_password=''`) (`$db_name='kubestore'`)

2. Crear la base de datos `kubeStore` con codificación `utf8mb4_bin` (si se usa otro nombre se deberán modificar los parametros de conexión del archivo `db.php`).
3. Ejecutar las sentencias sql del archivo `actual_kubeStore.sql` situandose en la base de datos creada. 
4. Ya debería poder entrar a la página.

## Comentarios

- Se ha creado un usuario por defecto con permisos de administración. Email: `default@user.com` Contraseña: `Entrada01`
- Hay dos tipos de permisos, usuario común y administrador. Ambos pueden realizar compras.

### Login
- Se deberá introducir un email y una contraseña.
### Registro
- Se deberán completar todos los campos para registrarse.
- Contraseña debe tener al menos 8 caracterés entre ellos una letra mayúscula, minuscula y un número.
- Si el email introducido ya pertenece a una cuenta entonces mostrará un aviso y no se creará la cuenta.
### Página principal 
- La página principal posee un filtro de productos desde él se puede buscar por nombre y ordenar los productos por distintos parametros.
- Los productos se pueden agregar a un carrito que mantendrá su contenido durante toda la sesión.
- Se pueden editar los datos de la cuenta al pulsar un botón que poseé el nombre y apellido del usuario. Si dicho usuario es administrador no podrá eliminar su cuenta.

### Carrito 

- Se pueden agregar y reducir la cantidad de un mismo producto.
- Se puede eliminar un producto del carrito.
- Se puede realizar la compra, entonces el carrito se limpia.
- El contenido del carrito persiste durante toda la sesión.

### Panel de control

- Gestión de usuarios. (editar, crear, eliminar)
- Historial de usuarios.
- Gestión de productos. (editar, crear, eliminar)
- Visualizar marcas y categorias. 
- Visualizar las ventas y el contenido de dicha venta.
- Historial de productos añadidos.

