import React, { useCallback } from 'react'
import { Tooltip, Button as MUIButton } from '@material-ui/core'
import { FileCopy, Link as LinkIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'

import { triggerSnackbar, TRIGGER_SNACKBAR } from '_modules/snackbar/actions'
import Snackbar from '_components/snackbar'
import { getWoliverUrl } from '_modules/saas/selectors'

import useStyles from './styles'

const Button = React.forwardRef((props, ref) => (
  <MUIButton {...props} ref={ref}>
    Copiar link para o cliente
  </MUIButton>
))

const CopyClipboardButton = ({ shareLink, tooltipText, isIconButton, disabled }) => {
  const dispatch = useDispatch()
  const styles = useStyles()
  const woliverUrl = useSelector(getWoliverUrl)

  const copyToClipboard = useCallback(() => {
    const path = shareLink[0] === '/' ? shareLink.subtring(0) : shareLink
    const fullLink = woliverUrl + path
    const copyHandler = event => {
      event.preventDefault()
      event.clipboardData.setData('text/plain', fullLink)
    }

    document.addEventListener('copy', copyHandler)
    const didCopy = copy(fullLink)
    document.removeEventListener('copy', copyHandler)

    if (didCopy) {
      dispatch(triggerSnackbar())
    }
  }, [dispatch, shareLink, woliverUrl])

  return (
    <>
      <Tooltip title={tooltipText}>
        {isIconButton ? (
          <MUIButton
            className={classnames(styles.copyButton, styles.iconButton)}
            variant="outlined"
            color="secondary"
            aria-label="copiar link para o clipboard"
            onClick={copyToClipboard}
            disabled={disabled}
          >
            <LinkIcon />
          </MUIButton>
        ) : (
          <Button
            className={styles.copyButton}
            variant="outlined"
            startIcon={<FileCopy />}
            color="secondary"
            aria-label="copiar link para o clipboard"
            onClick={copyToClipboard}
          />
        )}
      </Tooltip>
      <Snackbar variant="default" message="Link copiado!" action={TRIGGER_SNACKBAR.ACTION} />
    </>
  )
}

CopyClipboardButton.propTypes = {
  shareLink: PropTypes.string.isRequired,
  tooltipText: PropTypes.string,
  isIconButton: PropTypes.bool,
  disabled: PropTypes.bool,
}

CopyClipboardButton.defaultProps = {
  tooltipText: 'Link para o locatário agendar uma visita',
  isIconButton: false,
  disabled: false,
}

export default CopyClipboardButton
