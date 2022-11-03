import PropTypes from 'prop-types';
import Image from 'next/image'
import logoWithText from '../public/logos/logo.svg'
import logo from '../public/logos/logo-footer.svg'
import {useTranslation} from "next-i18next";


const Logo = ({title, ...props}) => {
  const {t} = useTranslation();
  const src = title ? logoWithText : logo;
  return (
    <Image
      src={src}
      alt={t('logo.alt')}
      className="d-block"
      {...props}
    />
  )
};

Logo.propTypes = {
  title: PropTypes.bool
};

Logo.defaultProps = {
  title: true
};

export default Logo;
