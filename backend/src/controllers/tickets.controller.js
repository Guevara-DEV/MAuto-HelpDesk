const ticketService = require("../services/tickets.service");

exports.createTicket = async (req, res) => {
    try {

        console.log("USER:", req.user);

        const data = {
            ...req.body,
            created_by: req.user.id
        };

        const ticket = await ticketService.createTicket(data);

        res.json(ticket);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error creando ticket");

    }
};

exports.getTickets = async (req, res) => {
    try {

        const tickets = await ticketService.getTickets();

        res.json(tickets);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error obteniendo tickets");

    }
};

exports.assignTicket = async (req, res) => {
    try {

        const { id } = req.params;
        const { assigned_to } = req.body;

        const result = await ticketService.assignTicket(id, assigned_to);

        res.json(result);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error asignando ticket");

    }
};

exports.updateStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { status_id } = req.body;

        const result = await ticketService.updateStatus(id, status_id);

        res.json(result);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error actualizando estado");

    }
};

exports.addComment = async (req, res) => {
    try {

        const { id } = req.params;
        const { comment, user_id } = req.body;

        const result = await ticketService.addComment(id, comment, user_id);

        res.json(result);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error agregando comentario");

    }
};

exports.getComments = async (req, res) => {
    try {

        const { id } = req.params;

        const comments = await ticketService.getComments(id);

        res.json(comments);

    } catch (error) {

        console.error(error);
        res.status(500).send("Error obteniendo comentarios");

    }
};

