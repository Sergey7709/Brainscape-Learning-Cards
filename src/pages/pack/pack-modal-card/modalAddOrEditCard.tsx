import { BaseSyntheticEvent, Dispatch, ReactElement, RefObject, SetStateAction } from 'react'

import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledTextField } from '@/components/ui/controlled/controlled-textfiled'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { JustifyContent } from '@/components/ui/modal/typeForModal.ts'
import { Typography } from '@/components/ui/typography'

type FormCard = { question: string; answer: string; imageQuestion?: any; imageAnswer?: any }

type ModalAddOrEditCardProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onHandleSubmitForm: (e: BaseSyntheticEvent | undefined) => Promise<void>
  borderBottomHeader?: boolean | undefined
  justifyContentHeader?: JustifyContent | undefined
  register: UseFormRegister<FormCard>
  errors: FieldErrors<FormCard>
  imageQuestionFormValue: FileList
  onChangeImageQuestionForm: (e: FileList | undefined | string) => void
  imageAnswerFormValue: FileList
  onChangeImageAnswerForm: (e: FileList | undefined | string) => void
  setCoverQuestionImage?: Dispatch<SetStateAction<string>>
  setCoverAnswerImage?: Dispatch<SetStateAction<string>>
  questionValue: string
  handlerQuestionChange: (value: string) => void
  answerValue: string
  control: Control<FormCard>
  handlerAnswerChange: (event: string) => void
  handlerClosedModal: () => void
  children?: ReactElement
  headerTitle: string
  buttonTitle: string
  hiddenInputRefQuestion: RefObject<HTMLInputElement>
  hiddenInputRefAnswer: RefObject<HTMLInputElement>
}
export const ModalAddOrEditCard = (props: ModalAddOrEditCardProps) => {
  const {
    open,
    setOpen,
    onHandleSubmitForm,
    errors,
    imageAnswerFormValue,
    onChangeImageQuestionForm,
    imageQuestionFormValue,
    onChangeImageAnswerForm,
    handlerClosedModal,
    borderBottomHeader,
    justifyContentHeader,
    headerTitle,
    buttonTitle,
    control,
    hiddenInputRefQuestion,
    hiddenInputRefAnswer,
  } = props

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalConstructor.PortalAndOverlay>
        <form onSubmit={onHandleSubmitForm}>
          <ModalConstructor.Head
            borderBottomHeader={borderBottomHeader}
            justifyContentHeader={justifyContentHeader}
          >
            <Typography as={'span'} variant={'large'}>
              {headerTitle}
            </Typography>
          </ModalConstructor.Head>
          <ModalConstructor.Body>
            <ControlledTextField control={control} name={'question'} />
            <ImageUploader
              hiddenInputRef={hiddenInputRefQuestion}
              valueForm={imageQuestionFormValue}
              errorMessage={errors.imageQuestion?.message}
              onChangeForm={onChangeImageQuestionForm}
            />
            <ControlledTextField control={control} name={'answer'} />
            <ImageUploader
              hiddenInputRef={hiddenInputRefAnswer}
              valueForm={imageAnswerFormValue}
              errorMessage={errors.imageAnswer?.message}
              onChangeForm={onChangeImageAnswerForm}
            />
          </ModalConstructor.Body>
          <ModalConstructor.Footer>
            <Button type={'button'} variant={'secondary'} onClick={handlerClosedModal}>
              <Typography as={'span'} variant={'body2'}>
                Cancel
              </Typography>
            </Button>
            <Button variant={'primary'} fullWidth>
              <Typography as={'span'} variant={'body2'}>
                {buttonTitle}
              </Typography>
            </Button>
          </ModalConstructor.Footer>
        </form>
      </ModalConstructor.PortalAndOverlay>
      <ModalConstructor.Trigger>{props.children}</ModalConstructor.Trigger>
    </Modal>
  )
}
