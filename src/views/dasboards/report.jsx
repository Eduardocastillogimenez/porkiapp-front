import React from 'react';
import { Button, List } from 'antd';
import jsPDF from 'jspdf';

export const PigInfoModal = ({ pigInfo }) => {

  const downloadAllPDF = () => {
    const doc = new jsPDF();

    // Agregar la información completa del cerdo al PDF
    doc.text(`Información Completa del Cerdo`, 10, 10);
    doc.text(`Código de Nacimiento: ${pigInfo.birth_code}`, 10, 20);
    doc.text(`ID del Padre: ${pigInfo.parent_id}`, 10, 30);
    doc.text(`Género: ${pigInfo.gender}`, 10, 40);
    doc.text(`Peso: ${pigInfo.weight} kg`, 10, 50);
    doc.text(`Fecha de Nacimiento: ${pigInfo.birth_date}`, 10, 60);

    // Guardar el PDF
    doc.save(`informacion_completa_cerdo_${pigInfo.birth_code}.pdf`);
  };

  return (
    <>
        <List
          dataSource={[
            { campo: 'Código de Nacimiento', valor: pigInfo.birth_code },
            { campo: 'ID del Padre', valor: pigInfo.parent_id },
            { campo: 'Género', valor: pigInfo.gender },
            { campo: 'Peso', valor: `${pigInfo.weight} kg` },
            { campo: 'Fecha de Nacimiento', valor: pigInfo.birth_date },
          ]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.campo}
                description={item.valor}
              />
            </List.Item>
          )}
        />

        <Button key="download" type="primary" onClick={downloadAllPDF}>
            Descargar Todo en PDF
          </Button>
    </>
  );
};