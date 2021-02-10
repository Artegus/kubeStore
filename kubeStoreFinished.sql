-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Feb 10, 2021 at 12:58 PM
-- Server version: 5.7.28
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kubeStore_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `backupProducto`
--

CREATE TABLE `backupProducto` (
  `back_product_id` int(11) NOT NULL,
  `back_product_name` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `back_product_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `backupProducto`
--

INSERT INTO `backupProducto` (`back_product_id`, `back_product_name`, `back_product_price`) VALUES
(1, 'ShengShou Legend 2x2', 3.95),
(2, 'YuXin Kylin 3x3 V2 M', 9.99),
(3, 'Shengshou Legend 3x3 S', 2.99),
(4, 'YJ YuLong 3x3 V2 M', 8.49),
(5, 'QiYi Windmill 3x3', 5.2),
(6, 'Mofang JiaoShi Mastermorphix', 4.95),
(7, 'Z-Cube 2x2x1', 3.95),
(8, 'WitEden 3x3x5', 24.2),
(9, 'QiYi Super Floppy 3x3x1', 4.9),
(10, 'YJ Floppy Ghost Cube', 4.99),
(11, 'Crazy Bad 4x4x6 Fisher Cuboid', 33.9),
(12, 'YJ Super Floppy 3x3x1', 4.95),
(13, 'QiYi QiMing Pyraminx A', 7.2),
(14, 'Dayan Pyraminx V2', 13.95),
(15, 'Hexaminx', 32.5),
(16, 'VeryPuzzle Corner Only Megaminx', 39.9),
(17, 'Teraminx MF8', 99.9),
(18, 'ShengShou Teraminx', 74.9);

-- --------------------------------------------------------

--
-- Table structure for table `backupSaleInformation`
--

CREATE TABLE `backupSaleInformation` (
  `sale_id` int(11) NOT NULL,
  `product` int(11) NOT NULL,
  `product_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `backupUser`
--

CREATE TABLE `backupUser` (
  `back_user_id` int(11) NOT NULL,
  `back_user_email` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `back_user_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(80) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`) VALUES
(1, 'Shengshou cube'),
(2, 'YuXin'),
(3, 'Yon Jung Cube'),
(4, 'Qiyi'),
(5, 'MoFang'),
(6, 'Z-Cube'),
(7, 'MoFang JiaoShi'),
(8, 'WitEden'),
(9, 'Yon Jung Cube'),
(10, 'Dayan Cube'),
(11, 'Calvins Puzzle'),
(12, 'MF8 Cube'),
(13, 'Shengshou cube'),
(14, 'Very Puzzle');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Cubicos'),
(2, 'Cuboide'),
(3, 'Minx');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `product_description` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `product_amount` int(11) NOT NULL,
  `product_price` float NOT NULL,
  `product_brand` int(11) NOT NULL,
  `product_category` int(11) DEFAULT NULL,
  `product_image` varchar(100) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_description`, `product_amount`, `product_price`, `product_brand`, `product_category`, `product_image`) VALUES
(1, 'ShengShou Legend 2x2', 'ShengShou Legend 2x2 es el nuevo cubo 2x2 de la linea Legend de Shengshou, tiene la suavidad que podemos esperar de los cubos legend, es ligero y tiene un poco de corte de esquinas. Ideal para empezar a practicar speed solving con el cubo de rubik 2x2.', 10, 3.95, 13, 1, 'shengshou-legend-2x2.jpg'),
(2, 'YuXin Kylin 3x3 V2 M', 'El YuXin Kylin 3x3 V2 M es la segunda versión del cubo que utilizó Collin Burns para realizar el que en su día fue el single 5.25 world récord. Este cubo cuenta con tiles para una mayor duración, tiene imanes para una mayor estabilidad y un giro suave para una experiencia de resolución rápida y agradable.', 20, 9.99, 2, 1, 'yuxin-kylin-3x3-v2-m.jpg'),
(3, 'Shengshou Legend 3x3 S', 'El Shengshou Legend 3x3 S es un cubo 3x3 muy económico y con buen giro. Shengshou ha actualizado su versión del SS 3x3 legend para lanzar al mercado un cubo 3x3 de velocidad muy económico. Para ello a eliminado mucho plástico del diseño original del legend, han conseguido un cubo realmente ligero y con muy buen giro, aunque un poco ruidoso.', 40, 2.99, 13, 1, 'shengshou-legend-3x3-s.jpg'),
(4, 'YJ YuLong 3x3 V2 M', 'YJ YuLong 3x3 V2 M es un cubo 3x3 magnético de nueva generación. Este cubo es una actualización del Yulong 3x3, en esta versión se ha mejorado el diseño interno añadiendo las últimas mejoras para speed solving.\r\nEl Yulong 3x3 V2 M es un cubo low cost que te sorprenderá por sus características y su rendimiento. Es un cubo con una bonita estética y en general con muy buenas sensaciones, pensarás que tienes un cubo de alta gama entre las manos y todo ello a muy buen precio.', 23, 8.49, 9, 1, 'yj-yulong-3x3-v2-m.jpg'),
(5, 'QiYi Windmill 3x3', 'El Windmill 3x3 es una modificación del cubo 3x3 muy popular, ahora qiyi nos presenta su versión de este rompecabezas que sin duda es de las mejores del mercado. Tiene los clásicos colores del warrior con esa textura mate que tanto gusta. Este cubo se resuelve como un 3x3 normal con la dificultad añadida de que tenemos que orientar los centros de las capas laterales y que se deforma al mezclarlo.', 12, 5.2, 4, 1, 'qiyi-windmill-3x3.jpg'),
(6, 'Mofang JiaoShi Mastermorphix', 'Ahora Mofang JiaoShi ha lanzado al mercado su versión del ya conocido rompecabezas Mastermorphix. Tiene un giro muy bueno y una tonalidad de colores muy bonita.', 10, 4.95, 7, 1, 'mofang-jiaoshi-mastermorphix.jpg'),
(7, 'Z-Cube 2x2x1', 'El Z-Cube 2x2x1 es uno de los cubos de rubik más fáciles del mundo, en realidad es un Floppy 2x2, tiene 4 combinaciones posibles por lo que con darle algunos giros lo conseguirás resolver. Gira muy bien y además su giro es suave. Disponible en fondo negro, blanco, una versión transparente en la que se aprecia el funcionamiento interno y una en fondo azul luminoso ¡Consigue el tuyo ahora!', 10, 3.95, 6, 2, 'z-cube-2x2x1.jpg'),
(8, 'WitEden 3x3x5', 'Por fin disponible el WitEden 3x3x5, un cuboide de mucha calidad con un giro muy rápido, estable y controlable, ¿que más podemos pedir?', 10, 24.2, 8, 2, 'witeden-3x3x5.jpg'),
(9, 'QiYi Super Floppy 3x3x1', 'El QiYi Super Floppy 3x3x1 es un cubo de muy sencilla resolución, es como una capa del cubo 3x3, pero como es la versión super floppy podemos hacer giros de 90 º haciendo que se deforme el cubo y sea un poco más interesante.', 10, 4.9, 4, 2, 'qiyi-super-floppy-3x3x1.jpg'),
(10, 'YJ Floppy Ghost Cube', 'El Floppy es un cubo que ya todos conocemos, ahora YJ ha lanzado la versión 3x3x1 del Ghost Cube, por lo que ha conseguido un interesante rompecabezas que aunque tenga pocas piezas es muy entretenido de resolver ya que tendrás que resolverlo por formas en lugar de por colores.', 15, 4.99, 9, 2, 'yj-floppy-ghost-cube.jpg'),
(11, 'Crazy Bad 4x4x6 Fisher Cuboid', 'El Crazy Bad 4x4x6 Fisher Cuboid es una modificación del 4x4x6 cúbico que realizó Crazy Bad Cuber.', 10, 33.9, 11, 2, 'crazy-bad-4x4x6-fisher-cuboid.jpg'),
(12, 'YJ Super Floppy 3x3x1', 'YJ lanza su versión de 3x3x1, en este rompecabezas tan solo tenemos una capa del cubo de rubik 3x3, muy divertido y sencillo de resolver. ', 20, 4.95, 9, 2, 'yj-super-floppy-3x3x1.jpg'),
(13, 'QiYi QiMing Pyraminx A', 'QiYi lanza una nueva versión del QiMIng Pyraminx, mismo aspecto y rendimiento pero mejor precio. ¡No lo dejes escapar!', 15, 7.2, 4, 3, 'qiyi-qiming-pyraminx-a.jpg'),
(14, 'Dayan Pyraminx V2', 'El Dayan Pyraminx V2 sin duda te sorprenderá, en esta ocasión Dayan lanza un Pyraminx robusto y compacto y con novedosas características.', 20, 13.95, 10, 3, 'dayan-pyraminx-v2.jpg'),
(15, 'Hexaminx', 'Por fin, el megaminx convertido en cubo. No te pierdas esta increible modificación del clásico megaminx. ¡Ahora en kubekings!', 23, 32.5, 11, 3, 'hexaminx.jpg'),
(16, 'VeryPuzzle Corner Only Megaminx', 'El VeryPuzzle Corner Only Megaminx es un cubo que representa tan solo las esquinas del megaminx, tiene 20 piezas a ordenar, en cada esquina encontramos 3 colores que al juntarse con los colores de sus piezas adyacentes hacen que el cubo en total tenga 12 colores. Es bastante sencillo de resolver.', 10, 39.9, 14, 3, 'verypuzzle-corner-only-megaminx.jpg'),
(17, 'Teraminx MF8', 'El Teraminx MF8 es uno de los dodecaedros mas grandes y con mas piezas del mercardo, consigue este fantástico dodecaedro de 7x7.', 5, 99.9, 12, 3, 'teraminx-mf8.jpg'),
(18, 'ShengShou Teraminx', 'El Shengshou Teraminx es un dodecaedro de 7 capas, es el equivalente a un cubo de rubik 7x7 pero en dodecaedro, viene con las sticker puestas y bastante lubricado por lo que su giro es buenísimo, es uno de los rompecabezas secuenciales con mas piezas, con toda la calidad de ShengShou.', 5, 74.9, 1, 3, 'shengshou-teraminx.jpg');

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `backup_product` AFTER INSERT ON `product` FOR EACH ROW INSERT INTO backupProducto (back_product_name, back_product_price)
VALUES (new.product_name, new.product_price)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `rol_name` varchar(30) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`rol_id`, `rol_name`) VALUES
(1, 'usuario'),
(2, 'empleado'),
(3, 'administrador');

-- --------------------------------------------------------

--
-- Table structure for table `sale`
--

CREATE TABLE `sale` (
  `sale_id` int(11) NOT NULL,
  `sale_user` int(11) NOT NULL,
  `sale_timeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sale_totalPrice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `saleInformation`
--

CREATE TABLE `saleInformation` (
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Triggers `saleInformation`
--
DELIMITER $$
CREATE TRIGGER `backup_saleInformation` AFTER INSERT ON `saleInformation` FOR EACH ROW INSERT INTO backupSaleInformation (product, product_amount) VALUES (new.product_id, new.amount)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(60) COLLATE utf8mb4_bin NOT NULL,
  `user_surname` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `user_gender` int(11) DEFAULT NULL,
  `user_address` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `user_email` varchar(80) COLLATE utf8mb4_bin NOT NULL,
  `user_password` mediumtext COLLATE utf8mb4_bin NOT NULL,
  `user_rol` int(11) NOT NULL,
  `user_createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `backup_user` AFTER INSERT ON `user` FOR EACH ROW INSERT INTO backupUser (back_user_email) VALUES (new.user_email)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `backupProducto`
--
ALTER TABLE `backupProducto`
  ADD PRIMARY KEY (`back_product_id`);

--
-- Indexes for table `backupSaleInformation`
--
ALTER TABLE `backupSaleInformation`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `foreign_key_product` (`product`);

--
-- Indexes for table `backupUser`
--
ALTER TABLE `backupUser`
  ADD PRIMARY KEY (`back_user_id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `foreign_key_category` (`product_category`),
  ADD KEY `foreign_key_brand` (`product_brand`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indexes for table `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `sale_user` (`sale_user`);

--
-- Indexes for table `saleInformation`
--
ALTER TABLE `saleInformation`
  ADD KEY `saleInformation_ibfk_sale` (`sale_id`),
  ADD KEY `saleInformation_ibfk_product` (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `foreign_key_rol` (`user_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `backupProducto`
--
ALTER TABLE `backupProducto`
  MODIFY `back_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `backupSaleInformation`
--
ALTER TABLE `backupSaleInformation`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `backupUser`
--
ALTER TABLE `backupUser`
  MODIFY `back_user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sale`
--
ALTER TABLE `sale`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `backupSaleInformation`
--
ALTER TABLE `backupSaleInformation`
  ADD CONSTRAINT `foreign_key_product` FOREIGN KEY (`product`) REFERENCES `backupProducto` (`back_product_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `foreign_key_brand` FOREIGN KEY (`product_brand`) REFERENCES `brand` (`brand_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `foreign_key_category` FOREIGN KEY (`product_category`) REFERENCES `category` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `foreign_key_user` FOREIGN KEY (`sale_user`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `saleInformation`
--
ALTER TABLE `saleInformation`
  ADD CONSTRAINT `saleInformation_ibfk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saleInformation_ibfk_sale` FOREIGN KEY (`sale_id`) REFERENCES `sale` (`sale_id`) ON DELETE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `foreign_key_rol` FOREIGN KEY (`user_rol`) REFERENCES `rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
