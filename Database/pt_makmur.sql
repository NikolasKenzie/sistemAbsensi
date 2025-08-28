-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2025 at 04:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pt_makmur`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `employee_id` int(11) NOT NULL,
  `id_attendance` int(11) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `status` enum('Present','Leave','Sick','Alpha','Permit') NOT NULL DEFAULT 'Alpha',
  `location` varchar(255) DEFAULT NULL,
  `reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`employee_id`, `id_attendance`, `employee_name`, `date`, `check_in`, `check_out`, `status`, `location`, `reason`) VALUES
(1, 18, 'Yanto', '2025-08-28', '21:25:59', NULL, 'Present', 'Kantor A', '-'),
(2, 17, 'Jason', '2025-08-28', '21:25:03', NULL, 'Present', 'Kantor A', '-'),
(3, 19, 'Sarah', '2025-08-28', '21:26:12', NULL, 'Present', 'Kantor B', '-'),
(4, 21, 'Janice Kaori <3', '2025-08-28', NULL, NULL, 'Sick', NULL, 'sakit hati diputusin pacar\n');

--
-- Triggers `attendance`
--
DELIMITER $$
CREATE TRIGGER `set_employee_name_before_insert` BEFORE INSERT ON `attendance` FOR EACH ROW BEGIN
    DECLARE emp_name VARCHAR(100);
    SELECT name INTO emp_name FROM employees WHERE id = NEW.employee_id;
    SET NEW.employee_name = emp_name;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `id_card` varchar(50) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` int(30) NOT NULL,
  `job_position` varchar(100) NOT NULL,
  `departement_id` varchar(100) NOT NULL,
  `salary` decimal(20,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `id_card`, `name`, `gender`, `birth_date`, `email`, `phone_number`, `job_position`, `departement_id`, `salary`) VALUES
(1, '1122334455', 'Yanto', 'male', '1996-08-15', 'yanto123@gmail.com', 812345678, 'Fullstack developer', 'Kantor A', 14000000),
(2, '4466557832', 'Jason', 'male', '2000-11-17', 'jason321@gmail.com', 822345565, 'Angular developer', 'Kantor A', 9000000),
(3, '8877231564', 'Sarah', 'Female', '1995-05-11', 'sarah56@gmail.com', 856776644, 'UI/UX', 'Kantor B', 5300000),
(4, '8866756453', 'Janice Kaori <3', 'Female', '2009-09-10', 'janicekaori123@gmail.com', 812334456, 'Intern Tim Digital', 'Kantor B', 1000000),
(5, '8866775566', 'Bobby', 'male', '1990-08-15', 'bobby123@gmail.com', 856772211, 'admin_dashboard', 'kantor A', 5300000);

-- --------------------------------------------------------

--
-- Table structure for table `login_system`
--

CREATE TABLE `login_system` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` enum('admin','employee','absent') NOT NULL DEFAULT 'employee'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_system`
--

INSERT INTO `login_system` (`id`, `email`, `password`, `name`, `role`) VALUES
(1, 'yanto123@gmail.com', 'employee1', 'Yanto', 'employee'),
(2, 'jason321@gmail.com', 'employee2', 'Jason', 'employee'),
(3, 'sarah56@gmail.com', 'employee3', 'Sarah', 'employee'),
(4, 'janicekaori123@gmail.com', 'employee4', 'Janice Kaori <3', 'employee'),
(5, 'bobby123@gmail.com', 'admin1', 'Bobby', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`employee_id`,`date`),
  ADD UNIQUE KEY `id_attendance` (`id_attendance`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `login_system`
--
ALTER TABLE `login_system`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id_attendance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_employee_attendance` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_system`
--
ALTER TABLE `login_system`
  ADD CONSTRAINT `login_system_ibfk_1` FOREIGN KEY (`id`) REFERENCES `employees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
