-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Ven 01 Mars 2013 à 10:26
-- Version du serveur: 5.5.24
-- Version de PHP: 5.3.10-1ubuntu3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `Spectr`
--

-- --------------------------------------------------------

--
-- Structure de la table `Spectr_score`
--

CREATE TABLE IF NOT EXISTS `Spectr_score` (
  `user` varchar(50) NOT NULL,
  `level` varchar(3) NOT NULL,
  `score` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Spectr_user`
--

CREATE TABLE IF NOT EXISTS `Spectr_user` (
  `user` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `tutorial` varchar(5) NOT NULL DEFAULT 'false',
  `level` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
