export const EmployeeTypeDisplayNames = Object.freeze({
        "driver": "Driver Employee",
        "Warehouse_supervisor": "Warehouse Manager",
        "receptionist": "Receptionist Employee"
});

export const getEmployeeTypeDisplayName = (type) => {
        return EmployeeTypeDisplayNames[type] || type;
};
