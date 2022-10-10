import React from 'react'
import ReactDOMServer from 'react-dom/server';

export function PersonBox(person) {
  const DOB = person.DOB
  const DOD = person.DOD


  const humanDate = (date) => {
    if (!date) return date;
    let dateComponent = new Date(date).toJSON().slice(0, 10);
    return dateComponent.replace(/-/g, "/");;
  }

  const calcAge = () => {
    const ageDifMs = DOD ?
      new Date(DOD).getTime() - new Date(DOB).getTime() :
      new Date().getTime() - new Date(DOB).getTime();

    const ageDate = new Date(ageDifMs);
    return ageDate.getUTCFullYear() - 1970;
  }

  const ageDetails = {
    age: calcAge(),
    DOB: humanDate(DOB),
    DOD: humanDate(DOD),
    vitalStatus: DOD ?
      `Deceased` :
      `${calcAge() <= 0 ?
        'Unborn' :
        'Alive'}`
  }

  const isDead = () => {
    return ageDetails.DOD ?
      'red' : 'green';
  }

  return (
    ReactDOMServer.renderToStaticMarkup(
      <>
        {console.log(person)}
        <h6 style={{ textAlign: 'center', margin: 0 }}>{person.fullName}</h6>
        {ageDetails.DOB && <p style={{ textAlign: 'center', margin: 0 }}>
          {new Date(ageDetails.DOB).getFullYear()}-{ageDetails.DOD && new Date(ageDetails.DOD).getFullYear() || <>&emsp;&emsp;</>}
        </p>}
        <table>
          <tr>
            <td>Age:&emsp;</td>
            {ageDetails.vitalStatus === 'Deceased' && <td style={{ color: isDead() }} >Lived till {ageDetails.age}</td>}
            {ageDetails.vitalStatus != 'Deceased' && <td style={{ color: isDead() }}>{ageDetails.age} years old</td>}
          </tr>
          {person.gender && ageDetails.age >= 14 && <tr>
            <td>G:</td>
            <td>{person.gender}</td>
          </tr>}
        </table>
      </>
    )
  )
}
