<?php

namespace Hikmadh\Newsletter\Block;

class Subscribe extends \Magento\Framework\View\Element\Template
{
    /**
     * Retrieve form action url and set "secure" param to avoid confirm
     * message when we submit form from secure page to unsecure
     *
     * @return string
     */
    const XML_SIMPLE_POPUP_WINDOW_BLOCK_ID = 'simplepopupwindow/general/block_id';

    protected $_scopeConfig;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        parent::__construct($context);
        $this->_scopeConfig = $scopeConfig;
    }

    public function getSimplePopupWindowBlockId()
    {
        return $this->_scopeConfig->getValue(self::XML_SIMPLE_POPUP_WINDOW_BLOCK_ID, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }
    public function getFormActionUrl()
    {   
        return $this->getUrl('hikmadh_newsletter/subscriber/new', ['_secure' => true]);
    }
}
