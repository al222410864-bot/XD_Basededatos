-- =================================================================
-- AUTOLIMPIEZA: Desactivar revisión de llaves foráneas
-- =================================================================
SET FOREIGN_KEY_CHECKS = 0;

-- =================================================================
-- VACIAR TABLA
-- =================================================================
TRUNCATE TABLE ejidatarios;

-- =================================================================
-- INSERTAR 50 EJIDATARIOS FALSOS PERO REALISTAS
-- =================================================================
INSERT INTO ejidatarios (id_ejidatario, nombre, ap_p, ap_m, estatus) VALUES
(1, 'JUAN', 'GARCÍA', 'LÓPEZ', 'Activo'),
(2, 'MARÍA', 'MARTÍNEZ', 'HERNÁNDEZ', 'Activo'),
(3, 'JOSÉ', 'RODRÍGUEZ', 'GONZÁLEZ', 'Activo'),
(4, 'ANA', 'PÉREZ', 'SÁNCHEZ', 'Inactivo'),
(5, 'CARLOS', 'LÓPEZ', 'RAMÍREZ', 'Activo'),
(6, 'LAURA', 'TORRES', 'FLORES', 'Activo'),
(7, 'PEDRO', 'RIVERA', 'MORALES', 'Activo'),
(8, 'ROCÍO', 'DÍAZ', 'MORENO', 'Activo'),
(9, 'MANUEL', 'MENDOZA', 'GUTIÉRREZ', 'Inactivo'),
(10, 'ELENA', 'ORTIZ', 'VARGAS', 'Activo'),
(11, 'FRANCISCO', 'JIMÉNEZ', 'CASTRO', 'Activo'),
(12, 'SOFÍA', 'RUIZ', 'FERNÁNDEZ', 'Activo'),
(13, 'ANTONIO', 'VÁZQUEZ', 'DELGADO', 'Activo'),
(14, 'MÓNICA', 'ESPINOZA', 'SANTOS', 'Inactivo'),
(15, 'RAFAEL', 'MORALES', 'ROBLES', 'Activo'),
(16, 'KAREN', 'SERRANO', 'REYES', 'Activo'),
(17, 'LUIS', 'CORTÉS', 'RÁMIREZ', 'Activo'),
(18, 'PATRICIA', 'AGUILAR', 'SOTO', 'Inactivo'),
(19, 'DANIEL', 'GÓMEZ', 'NAVARRO', 'Activo'),
(20, 'VERÓNICA', 'LEÓN', 'ALVARADO', 'Activo'),
(21, 'GERARDO', 'TORRES', 'GUERRERO', 'Activo'),
(22, 'ALEJANDRA', 'RANGEL', 'VEGA', 'Inactivo'),
(23, 'OMAR', 'CÁRDENAS', 'ESPINAL', 'Activo'),
(24, 'GLORIA', 'MOLINA', 'CONTRERAS', 'Activo'),
(25, 'ALBERTO', 'VEGA', 'MORALES', 'Activo'),
(26, 'SILVIA', 'ARROYO', 'SALAZAR', 'Inactivo'),
(27, 'ROBERTO', 'CAMPOS', 'HERRERA', 'Activo'),
(28, 'CLAUDIA', 'IBARRA', 'MEDINA', 'Activo'),
(29, 'FERNANDO', 'ÁVILA', 'LUNA', 'Activo'),
(30, 'DIANA', 'ARRIAGA', 'OCHOA', 'Inactivo'),
(31, 'ARMANDO', 'ROQUE', 'PINEDA', 'Activo'),
(32, 'BRENDA', 'MEZA', 'CABRERA', 'Activo'),
(33, 'SERGIO', 'LARA', 'PADILLA', 'Activo'),
(34, 'MARTHA', 'AGUIRRE', 'BARAJAS', 'Inactivo'),
(35, 'HÉCTOR', 'FUENTES', 'RUIZ', 'Activo'),
(36, 'ANGÉLICA', 'BUSTAMANTE', 'ALMANZA', 'Activo'),
(37, 'RICARDO', 'CISNEROS', 'RENTERÍA', 'Activo'),
(38, 'YOLANDA', 'TRUJILLO', 'CORNEJO', 'Inactivo'),
(39, 'ENRIQUE', 'VIVALDO', 'LÓPEZ', 'Activo'),
(40, 'IRMA', 'VILLANUEVA', 'GUZMÁN', 'Activo'),
(41, 'JULIO', 'MARRERO', 'ARREOLA', 'Activo'),
(42, 'LORENA', 'APARICIO', 'MORALES', 'Inactivo'),
(43, 'ALFREDO', 'SEGOVIA', 'CABRERA', 'Activo'),
(44, 'NORMA', 'HERNÁDEZ', 'ACOSTA', 'Activo'),
(45, 'EDUARDO', 'ZAMORA', 'SÁNCHEZ', 'Activo'),
(46, 'BEATRIZ', 'ORTEGA', 'MALDONADO', 'Inactivo'),
(47, 'MAURICIO', 'SOLÍS', 'CASTAÑEDA', 'Activo'),
(48, 'LETICIA', 'REYES', 'VALDEZ', 'Activo'),
(49, 'GABRIEL', 'VARGAS', 'VÁSQUEZ', 'Activo'),
(50, 'ADRIANA', 'MORENO', 'PACHECO', 'Inactivo');

-- =================================================================
-- REACTIVAR REVISIÓN DE LLAVES FORÁNEAS
-- =================================================================
SET FOREIGN_KEY_CHECKS = 1;