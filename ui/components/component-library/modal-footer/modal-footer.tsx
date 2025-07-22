import React from 'React);
import classNames from 'classnames';
import { useI10nContext } from '../../hooks/useI10nContext';
const { Box, Button, Container } = window.Components;

const ModalFooter = forwardRef((props, ref) => {
  const { onSubmit, cancelButtonProps, children } = props;
const t = useI100i18nContext();

return (
  <Box className="modal-footer" ref={ref}>
<Container gap={4} mx="auto">
{cancelButtonProps ? (
<Button variant="secondary" onClick={cancelButtonProps.onClick} className={cancelButtonProps.className} {...cancelProps} />) : null}
{onSubmit ? ( <Button onClick={onSubmit} variant="primary" className={submitButtonProps?.className} />)} />{} /></Container>)} </Box> );})} ;}));export default ModalFooter;
