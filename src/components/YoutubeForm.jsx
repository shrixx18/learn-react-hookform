import React, { useEffect } from 'react'
import{ useForm, useFieldArray } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
let renderCount = 0

const YouTubeForm = () => {
  const form = useForm({
    defaultValues: {
      username:"Dev",
      email:"",
      channel:"",
      social: {
        twitter:"",
        facebook:""
      },
      phoneNumbers:["",""],
      phNumber: [{number: ''}],
      age: 0,
      dob: new Date(),
      
    },
    mode: "onBlur"
    
  })
  
  const { register,control,handleSubmit,formState, watch, getValues,setValue, } = form
  const { errors, touchedFields, dirtyFields, isDirty,isValid, isSubmitting, isSubmitted, isSubmitSuccessful } = formState
  console.log( isSubmitting, isSubmitted,isSubmitSuccessful )
  const {fields} = useFieldArray({
    name:'phNumber',
    control
  })

  const onSubmit = (data)=> {
    console.log('Form Submitted',data)
  }
const handleGetValues = () =>{
  console.log("Get Values", getValues())
}

const onError = (errors) => {
  console.log("Form errors",errors)
}

// useEffect(()=>{
//   if(isSubmitSuccessful) {
//     reset()
//   }
// }, [isSubmitSuccessful, reset])

const handleSetValues = () => {
  setValue("username","",{
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true
  })
}
const watchUsername = watch("username")

  renderCount++
  
  
  return (
    <>
    <h1>Youtube Form ({renderCount/2})</h1>
    <h2>watched value : {watchUsername}</h2>
    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className='form-control'>
        <label htmlFor="username">Username</label>
        <input type="text" id='username' {...register("username",{
          required: "Username is required",
        })}/>
        <p>{errors.username?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="email">E-mail</label>
        <input type="email" id='email' {...register("email",{
         
          validate: (fieldValue)=>{
            return (fieldValue!== "admin@example.com" || "Enter a different email address")
          }
         
        })}/>
        <p>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="channel">Channel</label>
        <input type="text" id='channel' {...register("channel",{
          required: "Channel name is required",
        },
        )}/>
        <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="twitter">Twitter</label>
        <input type="text" id='twitter' {...register("social.twitter", {
          disabled: watch("channel") === ""
          
        }
        )}/>
        
        </div>
        <div className='form-control'>
        <label htmlFor="facebook">Facebook</label>
        <input type="text" id='facebook' {...register("social.facebook"
        )}/>
        
        </div>

        <div className='form-control'>
        <label htmlFor="primary-phone">Primary Phone</label>
        <input type="text" id='primary-phone' {...register("phoneNumbers.0"
        )}/>
        
        </div>
        <div className='form-control'>
        <label htmlFor="secondary-phone">Secondary Phone</label>
        <input type="text" id='secondary-phone' {...register("phoneNumbers.1"
        )}/>
        
        </div>

        <div className='form-control'>
        <label htmlFor="age">Age</label>
        <input type="number" id='age' {...register("age",{
          valueAsNumber: true,
          required: "Age is required",
        },
        )}/>
        <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
        <label htmlFor="dob">Date of birth</label>
        <input type="date" id='dob' {...register("dob",{
          valueAsDate: true,
          required: "dob is required",
        },
        )}/>
        <p className='error'>{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
        <button type='button' onClick={() => reset()}>Reset</button>
        <button type='button' onClick={handleGetValues}>Get Values</button>
        <button type='button' onClick={handleSetValues}>Set Values</button>


    </form>
    <DevTool control={control}/>
    </>
  )
}

export default YouTubeForm