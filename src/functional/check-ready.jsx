import React, {useEffect, useState} from "react";

const CheckError = ({values}) => {
    const [inError, setErrors] = useState([])
    const checkReady = () => {
        const errors = []
        if (values.id == null || values.id <= 0 || values.id === "") {
            errors.push("Δεν δώθηκε σωστό id (μικρότερό απο το 0 ή κενό")
        }
        if (values.authDate == null) {
            errors.push("Δεν δώθηκε ημερομηνία")
        }
        if (values.category == null || values.category === 'all') {
            errors.push("Δεν ορίσθηκε κατηγορία")
        }
        if (values.idInCategory == null || values.idInCategory === "") {
            errors.push("Δεν δώθηκε σωστό id για στην κατηγορία")
        }
        if (values.content == null || values.content.trim().length < 5) {
            errors.push("Δεν δώθηκε σωστό κείμενο (κενό ή  πολύ μικρό σε μέγεθος)")
        }
        setErrors(errors)
        return errors.length === 0
    }

    useEffect(() => {
        if (values) checkReady()
    }, [values])

    if (inError.length > 0) {
        return (<>
                <h2>Υπάρχουν λάθη</h2>
                {inError.map((error, idx) => <div key={idx}>{error}</div>)}
            </>
        )
    }
return <></>
}

export default CheckError