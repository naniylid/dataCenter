import React from 'react';
import { Modal, ModalTable } from '@/shared/components';
import { fetchNodeData, processModalData } from '@/shared/services/chartData';

export default async function PageModal() {
    const modalData = await fetchNodeData();
    const modalTableData = processModalData(modalData);

    return (
        <Modal>
            <ModalTable data={modalTableData} />
        </Modal>
    );
}
