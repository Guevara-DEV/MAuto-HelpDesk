const pool = require("../config/db");

exports.createTicket = async (data) => {

    console.log("DATA RECIBIDA:", data);

    const {
        title,
        description,
        category_id,
        priority_id,
        created_by,
        department_id
    } = data;

    const result = await pool.query(
        `INSERT INTO tickets
    (title, description, category_id, priority_id, created_by, department_id, status_id)
    VALUES ($1,$2,$3,$4,$5,$6,1)
    RETURNING *`,
        [title, description, category_id, priority_id, created_by, department_id]
    );

    return result.rows[0];
};

exports.getTickets = async () => {

    const result = await pool.query(`
    SELECT t.*, s.name AS status, p.name AS priority
    FROM tickets t
    LEFT JOIN ticket_status s ON t.status_id = s.id
    LEFT JOIN priorities p ON t.priority_id = p.id
    ORDER BY t.created_at DESC
  `);

    return result.rows;
};

exports.assignTicket = async (ticketId, assignedTo) => {

    const result = await pool.query(
        `UPDATE tickets
     SET assigned_to = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING *`,
        [assignedTo, ticketId]
    );

    // 🔥 INSERTAR HISTORIAL
    await pool.query(
        `INSERT INTO ticket_history (ticket_id, action, new_value, user_id)
     VALUES ($1, 'ASIGNADO', $2, $3)`,
        [ticketId, assignedTo, assignedTo]
    );

    return result.rows[0];
};

exports.updateStatus = async (ticketId, statusId) => {

    const result = await pool.query(
        `UPDATE tickets
     SET status_id = $1,
         updated_at = NOW(),
         resolved_at = CASE WHEN $1 = 4 THEN NOW() ELSE resolved_at END
     WHERE id = $2
     RETURNING *`,
        [statusId, ticketId]
    );

    await pool.query(
        `INSERT INTO ticket_history (ticket_id, action, new_value, user_id)
     VALUES ($1, 'CAMBIO_ESTADO', $2, $3)`,
        [ticketId, statusId, 1] // luego será usuario logueado
    );


    return result.rows[0];
};

exports.addComment = async (ticketId, comment, userId) => {

  const result = await pool.query(
    `INSERT INTO ticket_comments (ticket_id, comment, user_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [ticketId, comment, userId]
  );

  // HISTORIAL
  await pool.query(
    `INSERT INTO ticket_history (ticket_id, action, new_value, user_id)
     VALUES ($1, 'COMENTARIO', $2, $3)`,
    [ticketId, comment, userId]
  );

  return result.rows[0];
};

exports.getComments = async (ticketId) => {

  const result = await pool.query(
    `SELECT tc.*, u.name
     FROM ticket_comments tc
     LEFT JOIN users u ON tc.user_id = u.id
     WHERE ticket_id = $1
     ORDER BY created_at ASC`,
    [ticketId]
  );

  return result.rows;
};

