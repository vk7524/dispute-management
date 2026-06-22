import { useEffect, useState } from "react";
import {
    createDispute,
    getTeams,
    getUsersByTeam,
} from "../services/disputeService";

const CreateDispute = ({ invoiceData,
    onClose, }) => {
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        customerCode:
            invoiceData?.customerCode || "",
        invoice:
            invoiceData?.invoice || "",
        reasonCode: "",
        description: "",
        ownerTeam: "",
        assigneeId: "",
        assigneeName: "",
        assigneeEmail: "",
        priority: "Medium",
        customerImpact: "",
    });

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams();

                console.log("Teams API Response", response);

                setTeams(response.data?.data || []);
            } catch (error) {
                console.log("Teams Error", error);
            }
        };

        fetchTeams();
    }, []);
    const loadUsers = async (teamName) => {
        try {
            const response =
                await getUsersByTeam(teamName);

            console.log(
                "Users API Response",
                response
            );

            setUsers(response.data?.data || []);
        } catch (error) {
            console.log("Users Error", error);
        }
    };
    const handleTeamChange = async (e) => {
        const selectedTeam = e.target.value;

        setFormData((prev) => ({
            ...prev,
            ownerTeam: selectedTeam,
            assigneeId: "",
            assigneeName: "",
            assigneeEmail: "",
        }));

        await loadUsers(selectedTeam);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAssigneeChange = (e) => {
        const selectedAssigneeId = e.target.value;
        const selectedAssignee = users.find(
            (user) => user._id === selectedAssigneeId
        );

        setFormData({
            ...formData,
            assigneeId: selectedAssigneeId,
            assigneeName: selectedAssignee?.name || "",
            assigneeEmail: selectedAssignee?.email || "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response =
                await createDispute(formData);

            alert("Ticket Created Successfully");

            console.log(response.data);

            setFormData({
                customerCode: "",
                invoice: "",
                reasonCode: "",
                description: "",
                ownerTeam: "",
                assigneeId: "",
                assigneeName: "",
                assigneeEmail: "",
                priority: "Medium",
                customerImpact: "",
            });

            setUsers([]);

            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
        <div
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-dispute-title"
            onClick={onClose}
        >
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 id="create-dispute-title">
                        Create Dispute
                    </h2>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close create dispute modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Customer Code</label>

                        <input
                            type="text"
                            name="customerCode"
                            value={formData.customerCode}
                            onChange={handleChange}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Invoice</label>

                        <input
                            type="text"
                            name="invoice"
                            value={formData.invoice}
                            onChange={handleChange}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Reason Code</label>

                        <input
                            type="text"
                            name="reasonCode"
                            value={formData.reasonCode}
                            onChange={handleChange}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Description</label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <br />

                    <div>
                        <label>Owner Team</label>

                        <select
                            name="ownerTeam"
                            value={formData.ownerTeam}
                            onChange={handleTeamChange}
                        >
                            <option value="">
                                Select Team
                            </option>

                            {teams.map((team) => (
                                <option
                                    key={team._id}
                                    value={team.name}
                                >
                                    {team.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <br />

                    <div>
                        <label>Assignee</label>

                        <select
                            name="assigneeId"
                            value={formData.assigneeId}
                            onChange={handleAssigneeChange}
                        >
                            <option value="">
                                Select Assignee
                            </option>

                            {/* {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {user.name} ({user.email})
                                </option>
                            ))} */}
                            {users.map((user) => (
                                <option
                                    key={user._id}
                                    value={user._id}
                                >
                                    {`${user.name} - ${user.email}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div>
                        <label>Priority</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">
                                Low
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="High">
                                High
                            </option>
                        </select>
                    </div>

                    <br />

                    <div>
                        <label>Customer Impact</label>

                        <input
                            type="text"
                            name="customerImpact"
                            value={formData.customerImpact}
                            onChange={handleChange}
                        />
                    </div>

                    <br />

                    <div className="modal-actions">
                        <button type="submit">
                            Create Ticket
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default CreateDispute;