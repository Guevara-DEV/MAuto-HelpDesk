const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/tickets.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// Crear ticket → TODOS autenticados
router.post("/", authMiddleware, ticketController.createTicket);

// Obtener tickets → TODOS autenticados
router.get("/", ticketController.getTickets);

// Asignar → SOLO supervisor y admin
router.put(
  "/:id/assign",
  authMiddleware,
  roleMiddleware([3, 4]),
  ticketController.assignTicket
);

// Cambiar estado → técnico, supervisor, admin
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware([2, 3, 4]),
  ticketController.updateStatus
);

// Comentarios → todos autenticados
router.post(
  "/:id/comments",
  authMiddleware,
  ticketController.addComment
);

router.get(
  "/:id/comments",
  authMiddleware,
  ticketController.getComments
);


module.exports = router;