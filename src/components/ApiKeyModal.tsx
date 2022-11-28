import React from 'react';
import styled from "@emotion/styled";
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import { useMutation } from "react-query";
import { setApiKeyRequest } from "../api/apiKey";

interface ApiKeyModalProps {
  visible: boolean;
  onClose: () => void;
}

const ApiKeyModal = ({ visible, onClose }: ApiKeyModalProps) => {

  const apiKeyMutation = useMutation('set/apiKey', (apiKey: string) => setApiKeyRequest(apiKey));

  return (
    <div>

      <Modal
        visible={visible}
        onClose={onClose}
      >
        <ModalBody
          onOk={() => {}}
          onClose={onClose}
          title={'설정'}
          onSubmit={async (e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              apiKey: { value: string };
            };

            await apiKeyMutation.mutateAsync(target.apiKey.value);
            onClose();
          }}
          okText={'저장'}
          cancelText={'취소'}
        >
          <FormItem>
            <Label htmlFor={'apiKey'}>API Key</Label>
            <Input required id='apiKey' name={'apiKey'}/>
          </FormItem>
        </ModalBody>
      </Modal>
    </div>
  );
};


const FormItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`

const Label = styled.label`
  color: dodgerblue;
  flex-shrink: 0;
  margin-right: 1rem;
`

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #333;
`


export default ApiKeyModal;