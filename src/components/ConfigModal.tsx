import React from 'react';
import Modal from "./Modal";
import ModalBody from "./ModalBody";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { configAtom } from "../store/config";

interface ConfigModalProps {
  visible: boolean;
  onClose: () => void;

}

const ConfigModal = ({ visible, onClose }: ConfigModalProps) => {
  const [config, setConfig] = useRecoilState(configAtom);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
    >
      <ModalBody
        onOk={() => {}}
        onClose={onClose}
        title={'설정'}
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            healScale: { value: string };
            takenDamageScale: { value: string };
          };

          setConfig((prev) => ({
            ...prev,
            healScale: parseFloat(target.healScale.value),
            takenDamageScale: parseFloat(target.takenDamageScale.value),
          }));
          onClose();
        }}
        okText={'저장'}
        cancelText={'취소'}
      >

        <FormItem>
          <Label htmlFor={'healScale'}>healScale</Label>
          <Input defaultValue={config.healScale} required id='healScale' name={'apiKey'}/>
        </FormItem>
        <FormItem>
          <Label htmlFor={'takenDamageScale'}>takenDamageScale</Label>
          <Input defaultValue={config.takenDamageScale} required id='takenDamageScale' name={'apiKey'}/>
        </FormItem>

      </ModalBody>
    </Modal>
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


export default ConfigModal;