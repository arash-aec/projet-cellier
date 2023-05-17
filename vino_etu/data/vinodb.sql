-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 17 mai 2023 à 13:13
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vino_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `vino__bouteille`
--

DROP TABLE IF EXISTS `vino__bouteille`;
CREATE TABLE IF NOT EXISTS `vino__bouteille` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(200) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `code_saq` varchar(50) DEFAULT NULL,
  `pays` int DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `prix_saq` float DEFAULT NULL,
  `url_saq` varchar(200) DEFAULT NULL,
  `url_img` varchar(200) DEFAULT NULL,
  `format` varchar(20) DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_vino__bouteille_vino__type1_idx` (`type`),
  KEY `fk_vino__bouteille_vino__pays1_idx` (`pays`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Structure de la table `vino__cellier`
--

DROP TABLE IF EXISTS `vino__cellier`;
CREATE TABLE IF NOT EXISTS `vino__cellier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_bouteille` int DEFAULT NULL,
  `date_achat` date DEFAULT NULL,
  `garde_jusqua` varchar(200) DEFAULT NULL,
  `notes` varchar(200) DEFAULT NULL,
  `prix` float DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `millesime` int DEFAULT NULL,
  `usager_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vino__liste_achat`
--

DROP TABLE IF EXISTS `vino__liste_achat`;
CREATE TABLE IF NOT EXISTS `vino__liste_achat` (
  `vino__usager_id` int NOT NULL AUTO_INCREMENT,
  `vino__bouteille_id` int NOT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`vino__usager_id`,`vino__bouteille_id`),
  KEY `fk_vino__usager_has_vino__bouteille_vino__usager1_idx` (`vino__usager_id`),
  KEY `fk_vino__liste_achat_vino__bouteille1_idx` (`vino__bouteille_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vino__pays`
--

DROP TABLE IF EXISTS `vino__pays`;
CREATE TABLE IF NOT EXISTS `vino__pays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pays` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vino__role`
--

DROP TABLE IF EXISTS `vino__role`;
CREATE TABLE IF NOT EXISTS `vino__role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vino__type`
--

DROP TABLE IF EXISTS `vino__type`;
CREATE TABLE IF NOT EXISTS `vino__type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vino__usager`
--

DROP TABLE IF EXISTS `vino__usager`;
CREATE TABLE IF NOT EXISTS `vino__usager` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `courriel` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courriel_UNIQUE` (`courriel`),
  KEY `fk_vino__usager_vino__role1_idx` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `vino__bouteille`
--
ALTER TABLE `vino__bouteille`
  ADD CONSTRAINT `fk_vino__bouteille_vino__pays1` FOREIGN KEY (`pays`) REFERENCES `vino__pays` (`id`),
  ADD CONSTRAINT `fk_vino__bouteille_vino__type1` FOREIGN KEY (`type`) REFERENCES `vino__type` (`id`);

--
-- Contraintes pour la table `vino__liste_achat`
--
ALTER TABLE `vino__liste_achat`
  ADD CONSTRAINT `fk_vino__liste_achat_vino__bouteille1` FOREIGN KEY (`vino__bouteille_id`) REFERENCES `vino__bouteille` (`id`),
  ADD CONSTRAINT `fk_vino__usager_has_vino__bouteille_vino__usager1` FOREIGN KEY (`vino__usager_id`) REFERENCES `vino__usager` (`id`);

--
-- Contraintes pour la table `vino__usager`
--
ALTER TABLE `vino__usager`
  ADD CONSTRAINT `fk_vino__usager_vino__role1` FOREIGN KEY (`role`) REFERENCES `vino__role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

INSERT INTO `vino__pays` VALUES(1, 'Espagne');
INSERT INTO `vino__pays` VALUES(2, 'États-Unis');
INSERT INTO `vino__pays` VALUES(3, 'Autriche');
INSERT INTO `vino__pays` VALUES(4, 'France');
INSERT INTO `vino__pays` VALUES(5, 'Italie');
INSERT INTO `vino__pays` VALUES(6, 'Canada');
INSERT INTO `vino__pays` VALUES(7, 'Québec');
INSERT INTO `vino__pays` VALUES(8, 'Chili');
INSERT INTO `vino__pays` VALUES(9, 'Portugal');
INSERT INTO `vino__pays` VALUES(10, 'Brezil');
INSERT INTO `vino__pays` VALUES(11, 'Australie');
INSERT INTO `vino__pays` VALUES(12, 'Argentine');
INSERT INTO `vino__pays` VALUES(13, 'Allemagne');
INSERT INTO `vino__pays` VALUES(14, 'Afrique du sud');
INSERT INTO `vino__pays` VALUES(15, 'Nouvelle-Zélande');
INSERT INTO `vino__pays` VALUES(16, 'Grèce');
INSERT INTO `vino__pays` VALUES(17, "Arménie (République d')");

INSERT INTO `vino__bouteille` VALUES(1, 'Borsao Seleccion', 'https://www.saq.com/media/catalog/product/1/0/10324623-1_1602104750.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '10324623', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 10324623', 11, 'https://www.saq.com/page/fr/saqcom/vin-rouge/borsao-seleccion/10324623', 'https://www.saq.com/media/catalog/product/1/0/10324623-1_1602104750.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(2, 'Monasterio de Las Vinas Gran Reserva', 'https://www.saq.com/media/catalog/product/1/0/10359156-1_1580596511.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '10359156', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 10359156', 19, 'https://www.saq.com/page/fr/saqcom/vin-rouge/monasterio-de-las-vinas-gran-reserva/10359156', 'https://www.saq.com/media/catalog/product/1/0/10359156-1_1580596511.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(3, 'Castano Hecula', 'https://www.saq.com/media/catalog/product/1/1/11676671-1_1603295447.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '11676671', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 11676671', 12, 'https://www.saq.com/page/fr/saqcom/vin-rouge/castano-hecula/11676671', 'https://www.saq.com/media/catalog/product/1/1/11676671-1_1603295447.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(4, 'Campo Viejo Tempranillo Rioja', 'https://www.saq.com/media/catalog/product/1/1/11462446-1_1644269154.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '11462446', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 11462446', 14, 'https://www.saq.com/page/fr/saqcom/vin-rouge/campo-viejo-tempranillo-rioja/11462446', 'https://www.saq.com/media/catalog/product/1/1/11462446-1_1644269154.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(5, 'Bodegas Atalaya Laya 2017', 'https://www.saq.com/media/catalog/product/1/2/12375942-1_1580663712.png?quality=80&fit=bounds&height=&width=', '12375942', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 12375942', 17, 'https://www.saq.com/page/fr/saqcom/vin-rouge/bodegas-atalaya-laya-2017/12375942', 'https://www.saq.com/media/catalog/product/1/2/12375942-1_1580663712.png?quality=80&fit=bounds&height=&width=', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(6, 'Vin Vault Pinot Grigio', 'https://www.saq.com/media/catalog/product/1/3/13467048-1_1578536117.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '13467048', 2, 'Vin blanc\r\n         \r\n      \r\n      \r\n      États-Unis, 3 L\r\n      \r\n      \r\n      Code SAQ : 13467048', NULL, 'https://www.saq.com/page/fr/saqcom/vin-blanc/vin-vault-pinot-grigio/13467048', 'https://www.saq.com/media/catalog/product/1/3/13467048-1_1578536117.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 3 L', 2);
INSERT INTO `vino__bouteille` VALUES(7, 'Huber Riesling Engelsberg 2017', 'https://www.saq.com/media/catalog/product/1/3/13675841-1_1578540323.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '13675841', 3, 'Vin blanc\r\n         \r\n      \r\n      \r\n      Autriche, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13675841', 22, 'https://www.saq.com/page/fr/saqcom/vin-blanc/huber-riesling-engelsberg-2017/13675841', 'https://www.saq.com/media/catalog/product/1/3/13675841-1_1578540323.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 2);
INSERT INTO `vino__bouteille` VALUES(8, 'Dominio de Tares Estay Castilla y Léon 2015', 'https://www.saq.com/media/catalog/product/1/3/13802571-1_1582741505.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '13802571', 1, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Espagne, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13802571', 18, 'https://www.saq.com/page/fr/saqcom/vin-rouge/dominio-de-tares-estay-castilla-y-leon-2015/13802571', 'https://www.saq.com/media/catalog/product/1/3/13802571-1_1582741505.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(9, 'Tessellae Old Vines Côtes du Roussillon 2016', 'https://www.saq.com/media/catalog/product/1/2/12216562-1_1628521517.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '12216562', 4, 'Vin rouge\r\n         \r\n      \r\n      \r\n      France, 750 ml\r\n      \r\n      \r\n      Code SAQ : 12216562', 21, 'https://www.saq.com/page/fr/saqcom/vin-rouge/tessellae-old-vines-cotes-du-roussillon-2016/12216562', 'https://www.saq.com/media/catalog/product/1/2/12216562-1_1628521517.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);
INSERT INTO `vino__bouteille` VALUES(10, 'Tenuta Il Falchetto Bricco Paradiso -... 2015', 'https://www.saq.com/media/catalog/product/1/3/13637422-1_1578539716.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', '13637422', 5, 'Vin rouge\r\n         \r\n      \r\n      \r\n      Italie, 750 ml\r\n      \r\n      \r\n      Code SAQ : 13637422', 34, 'https://www.saq.com/page/fr/saqcom/vin-rouge/tenuta-il-falchetto-bricco-paradiso---barbera-dasti-superiore-docg-2015/13637422', 'https://www.saq.com/media/catalog/product/1/3/13637422-1_1578539716.png?width=367&height=550&canvas=367,550&quality=80&fit=bounds', ' 750 ml', 1);

INSERT INTO `vino__cellier` VALUES(1, 10, '2019-01-16', '', '', 0, 3, 0, null);
INSERT INTO `vino__cellier` VALUES(2, 10, '2019-01-16', '', '', 0, 1, 0, null);
INSERT INTO `vino__cellier` VALUES(3, 5, '2019-01-16', '2020', '', 22, 10, 1999, null);
INSERT INTO `vino__cellier` VALUES(4, 5, '2019-01-16', '', '', 0, 1, 0, null);
INSERT INTO `vino__cellier` VALUES(5, 5, '2019-01-10', '', '', 0, 1, 0, null);
INSERT INTO `vino__cellier` VALUES(6, 0, '2019-01-16', '', '', 0, 1, 0, null);
INSERT INTO `vino__cellier` VALUES(7, 0, '2019-01-16', '', '', 0, 1, 0, null);
INSERT INTO `vino__cellier` VALUES(8, 5, '2019-01-16', '', '', 0, 10, 2000, null);
INSERT INTO `vino__cellier` VALUES(9, 3, '2019-01-26', 'non', '', 23.52, 1, 2015, null);

INSERT INTO `vino__type` VALUES(1, 'Vin rouge');
INSERT INTO `vino__type` VALUES(2, 'Vin blanc');
